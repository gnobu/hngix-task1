import express, { RequestHandler } from "express"
import fs from "fs"
import path from "path"
import httpStatus from "http-status"
import { v4 as uuid } from 'uuid'

import { IController } from "../interfaces/controller.interface"
import validate from "../middleware/validate"
import { videoValidation } from "../validation"
import { VideoService } from "../services/video.service"
import { NotFoundError } from "../errors/not-found.error"
import { BadRequestError } from "../errors/bad-request.error"
import { memoryUpload } from "../middleware/imageUpload.middleware"
import { StopRecordingPublisher } from "../events/publishers/stop-recording.publisher"
import { amqpWrapper } from "../utils/amqpWrapper"
import { IVideo } from "../models/video.model"

export class VideoController implements IController {
    path = '/videos'
    router = express.Router()

    constructor(private _videoService: VideoService) {
        this.initializeRoutes()
    }

    public initializeRoutes() {
        this.router.post(this.path, this._startRecording)
        this.router.put(`${this.path}/:id`, validate(videoValidation.uploadChunk), this._uploadBase64Chunk)
        this.router.put(`${this.path}/:id/formData`, memoryUpload.single('chunk'), this._uploadBlobChunk)
        this.router.put(`${this.path}/:id/end_recording`, this._finishRecording)
        this.router.get(this.path, this._getAllVideos)
        this.router.get(`${this.path}/:id`, this._getSingleVideo)
        this.router.delete(`${this.path}/:id`, this._deleteVideo)
    }

    /**
     * @swagger
     * tags:
     *   name: videos
     *   description: API endpoints for managing videos
    */

    /**
     * @swagger
     * /api/videos:
     *   post:
     *     summary: Create a video file and get the ID
     *     tags: [videos]
     *     responses:
     *       201:
     *         description: File uploaded successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: string
     *               example: 6519b3ba5dd8017a501d0b92
     *       500:
     *         description: File upload failed     
    */
    private _startRecording: RequestHandler = async (req, res) => {
        const filename = `${uuid()}.webm`
        fs.writeFileSync(path.join(__dirname, '..', '..', 'uploads', filename), Buffer.alloc(0))
        const { id } = await this._videoService.create({ filename })
        res.status(httpStatus.CREATED).json(id)
    }

    /**
     * @swagger
     * /api/videos/{id}:
     *   put:
     *     summary: Upload a video chunk in Base64 format
     *     tags: [videos]
     *     parameters:
     *         - name: id
     *           in: path
     *           description: id of the video for uploading chunks of string data
     *           required: true
     *     requestBody:
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               chunk:
     *                 type: string
     *                 format: binary
     *             required:
     *               - chunk
     *     responses:
     *       200:
     *         description: Files uploaded successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: string
     *               example: Successfully merged video
     *       500:
     *         description: File upload failed
    */
    private _uploadBase64Chunk: RequestHandler = async (req, res) => {
        const { chunk } = req.body
        const { id } = req.params
        const videoDoc = await this._videoService.findOne(id)
        if (!videoDoc) throw new NotFoundError()
        const existingVideoFilePath = path.join(__dirname, '..', '..', 'uploads', videoDoc.filename)
        fs.readFile(existingVideoFilePath, (err, existingVideoBuffer) => {
            if (err) {
                console.log('Error reading the existing video file:', err)
                throw new Error('Error reading the existing video file')
            }
            const mergedVideoBuffer = Buffer.concat([existingVideoBuffer, Buffer.from(chunk, 'base64')])
            fs.writeFile(existingVideoFilePath, mergedVideoBuffer, (err) => {
                if (err) {
                    console.log('Error writing the merged video file:', err)
                    throw new Error('Error writing the merged video file')
                }
            })
        })
        res.json("Successfully merged video")
    }

    /**
     * @swagger
     * /api/videos/{id}/formData:
     *   put:
     *     summary: Upload a video chunk in Blob format
     *     tags: [videos]
     *     parameters:
     *         - name: id
     *           in: path
     *           description: id of the video
     *           required: true
     *     consumes:
     *       - multipart/form-data
     *     requestBody:
     *       content:
     *         multipart/form-data:
     *           schema:
     *             type: object
     *             properties:
     *               chunk:
     *                 type: blob
     *             required:
     *               - chunk
     *     responses:
     *       200:
     *         description: Files uploaded successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: Blob
     *       500:
     *         description: File upload failed
    */
    private _uploadBlobChunk: RequestHandler = async (req, res) => {
        const blob = req.file
        if (!blob?.buffer) throw new BadRequestError('Bad File')
        const { id } = req.params
        const videoDoc = await this._videoService.findOne(id)
        if (!videoDoc) throw new NotFoundError()
        const existingVideoFilePath = path.join(__dirname, '..', '..', 'uploads', videoDoc.filename)
        fs.readFile(existingVideoFilePath, (err, existingVideoBuffer) => {
            if (err) {
                console.log('Error reading the existing video file:', err)
                throw new Error('Error reading the existing video file')
            }
            const mergedVideoBuffer = Buffer.concat([existingVideoBuffer, blob.buffer])
            fs.writeFile(existingVideoFilePath, mergedVideoBuffer, (err) => {
                if (err) {
                    console.log('Error writing the merged video file:', err)
                    throw new Error('Error writing the merged video file')
                }
            })
        })
        res.json("Successfully merged video")
    }

    /**
     * @swagger
     * /api/videos/{id}/end_recording:
     *   put:
     *     summary: Finish the recording and generate the transcription
     *     tags: [videos]
     *     parameters:
     *         - name: id
     *           in: path
     *           description: id of the video
     *           required: true
     *     requestBody:
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               title:
     *                 type: string
     *     responses:
     *       200:
     *         description: Processing the transcript
     *         content:
     *           application/json:
     *             schema:
     *               type: string
     *       500:
     *         description: Error while renaming
    */
    private _finishRecording: RequestHandler = async (req, res) => {
        const { id } = req.params
        const { title } = req.body

        let videoDoc: IVideo | null
        videoDoc = await this._videoService.findOne(id)
        if (!videoDoc) throw new NotFoundError()

        const videoFolder = path.join(__dirname, '..', '..', 'uploads')

        if (title) {
            const oldPath = `${videoFolder}/${videoDoc.filename}`
            const newFilename = `${title}.webm`
            fs.rename(oldPath, `${videoFolder}/${newFilename}`, async (err) => {
                if (err) {
                    console.log(err)
                    return res.json('Failed to set the title. Processing transcript')
                }
                let videoDoc = await this._videoService.update(id, { filename: newFilename })
                new StopRecordingPublisher(amqpWrapper.channel).publish({
                    id,
                    filepath: `${videoFolder}/${videoDoc?.filename}`
                })
            })
            return res.json('Processing transcript')
        }

        // Publish filepath and ID to broker
        new StopRecordingPublisher(amqpWrapper.channel).publish({
            id,
            filepath: `${videoFolder}/${videoDoc.filename}`
        })
        res.json('Processing transcript')
    }

    /**
     * @swagger
     * /api/videos/{id}:
     *   delete:
     *     summary: Delete a video by ID
     *     tags: [videos]
     *     parameters:
     *         - name: id
     *           in: path
     *           description: id of the video
     *           required: true
     *     responses:
     *       200:
     *         description: Succesfully deleted the video
     *         content:
     *           application/json:
     *             schema:
     *               type: string
     *       204:
     *         description: Video not found
    */
    private _deleteVideo: RequestHandler = async (req, res) => {
        const { id } = req.params
        const deletedDoc = await this._videoService.delete(id)
        if (!deletedDoc) return res.status(httpStatus.NO_CONTENT).end()
        const filepath = `${path.join(__dirname, '..', '..', 'uploads')}\\${deletedDoc.filename}`
        fs.unlinkSync(filepath)
        return res.json({ message: "Video deleted successfully" })
    }

    /**
     * @openapi
     * /api/videos:
     *   get:
     *     summary: Get a list of all videos
     *     tags: [videos]
     *     responses:
     *       200:
     *         description: Succesfully fetched videos
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     *                 properties:
     *                   id:
     *                     type: string
     *                     description: The unique identifier of the video.
     *                     example: abc123
     *                   filename:
     *                     type: string
     *                     description: The name of the video file.
     *                     example: video.mp4
     *                   transcription:
     *                     type: string
     *                     description: The transcription of the video.
     *                     example: This is a sample transcription.
     *       500:
     *         description: Unexpected error
    */
    private _getAllVideos: RequestHandler = async (req, res) => {
        const files = await this._videoService.findMany()
        const urls = files.map(file => ({
            video_url: `${process.env.BASE_URL}/video/${file.filename}`,
            transcription: file.transcription,
            id: file.id
        }))
        res.json(urls)
    }

    /**
     * @swagger
     * /api/videos/{id}:
     *   get:
     *     summary: Get a video by ID
     *     tags: [videos]
     *     parameters:
     *         - name: id
     *           in: path
     *           description: id of the video
     *           required: true
     *     responses:
     *       200:
     *         description: Succesfully fetched video
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 id:
     *                   type: string
     *                   description: The unique identifier of the video.
     *                   example: abc123
     *                 filename:
     *                   type: string
     *                   description: The name of the video file.
     *                   example: video.mp4
     *                 transcription:
     *                   type: string
     *                   description: The transcription of the video.
     *                   example: This is a sample transcription.
     *       500:
     *         description: Unexpected error
    */
    private _getSingleVideo: RequestHandler = async (req, res) => {
        const { id } = req.params
        console.log(id)
        const video = await this._videoService.findOne(id)
        if (!video) throw new NotFoundError()
        res.json({
            video_url: `${process.env.BASE_URL}/video/${video.filename}`,
            transcription: video.transcription,
            id: video.id
        })
    }
}
