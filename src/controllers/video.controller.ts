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

export class VideoController implements IController {
    path = '/videos'
    router = express.Router()

    constructor(private _videoService: VideoService) {
        this.initializeRoutes()
    }

    public initializeRoutes() {
        this.router.post(this.path, this._startRecording)
        this.router.get(this.path, this._getAllVideos)
        this.router.get(`${this.path}/:id`, this._getVideo)
        this.router.put(`${this.path}/:id`, validate(videoValidation.uploadChunk), this._uploadChunk)
        this.router.put(`${this.path}/:id/formData`, memoryUpload.single('chunk'), this._uploadChunkWMulter)
        this.router.put(`${this.path}/:id/end_recording`, this._finishRecording)
        this.router.delete(`${this.path}/:id`, validate(videoValidation.deleteVideoRecord), this._deleteVideoRecord)
    }

    private _startRecording: RequestHandler = async (req, res) => {
        const filename = `${uuid()}.webm`
        fs.writeFileSync(path.join(__dirname, '..', '..', 'uploads', filename), Buffer.alloc(0))
        const { id } = await this._videoService.create({ filename })
        res.status(httpStatus.CREATED).json(id)
    }

    private _uploadChunk: RequestHandler = async (req, res) => {
        const { chunk } = req.body
        const { id } = req.params
        const videoDoc = await this._videoService.findOne(id)
        if (!videoDoc) throw new NotFoundError()
        const existingVideoFilePath = path.join(__dirname, '..', '..', 'uploads', videoDoc.filename)
        fs.readFile(existingVideoFilePath, (err, existingVideoBuffer) => {
            if (err) {
                console.error('Error reading the existing video file:', err)
                throw new Error('Error reading the existing video file')
            }
            const mergedVideoBuffer = Buffer.concat([existingVideoBuffer, Buffer.from(chunk, 'base64')])
            fs.writeFile(existingVideoFilePath, mergedVideoBuffer, (err) => {
                if (err) {
                    console.error('Error writing the merged video file:', err)
                    throw new Error('Error writing the merged video file')
                }
            })
        })
        res.json("Successfully merged video")
    }

    private _uploadChunkWMulter: RequestHandler = async (req, res) => {
        const blob = req.file
        if (!blob?.buffer) throw new BadRequestError('Bad File')
        const { id } = req.params
        const videoDoc = await this._videoService.findOne(id)
        if (!videoDoc) throw new NotFoundError()
        const existingVideoFilePath = path.join(__dirname, '..', '..', 'uploads', videoDoc.filename)
        fs.readFile(existingVideoFilePath, (err, existingVideoBuffer) => {
            if (err) {
                console.error('Error reading the existing video file:', err)
                throw new Error('Error reading the existing video file')
            }
            const mergedVideoBuffer = Buffer.concat([existingVideoBuffer, blob.buffer])
            fs.writeFile(existingVideoFilePath, mergedVideoBuffer, (err) => {
                if (err) {
                    console.error('Error writing the merged video file:', err)
                    throw new Error('Error writing the merged video file')
                }
            })
        })
        res.json("Successfully merged video")
    }

    private _finishRecording: RequestHandler = async (req, res) => {
        const { id } = req.params
        const videoDoc = await this._videoService.findOne(id)
        if (!videoDoc) throw new NotFoundError()

        // Publish filepath and ID to broker
        const videoPath = path.join(__dirname, '..', '..', 'uploads', videoDoc.filename)
        new StopRecordingPublisher(amqpWrapper.channel).publish({
            id,
            filepath: videoPath
        })
        res.json('Processing transcript')
    }

    private _deleteVideoRecord: RequestHandler = async (req, res) => {
        const { id } = req.params

        const deleted = await this._videoService.delete(id)
        if (!deleted) return res.status(httpStatus.NO_CONTENT).end()

        const destination = path.join(__dirname, '..', '..', 'uploads')
        fs.unlinkSync(`${destination}\\${deleted.filename}`)

        return res.json({ message: "Video deleted successfully" })
    }

    private _getAllVideos: RequestHandler = async (req, res) => {
        const files = await this._videoService.findMany()
        const urls = files.map(file => ({
            video_url: `${process.env.BASE_URL}/video/${file.filename}`,
            transcription: file.transcription,
            id: file.id
        }))
        res.json(urls)
    }

    private _getVideo: RequestHandler = async (req, res) => {
        const { id } = req.params
        const video = await this._videoService.findOne(id)
        if (!video) throw new NotFoundError()
        res.json({
            video_url: `${process.env.BASE_URL}/video/${video.filename}`,
            transcription: video.transcription,
            id: video.id
        })
    }
}
