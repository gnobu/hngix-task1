import express, { RequestHandler } from "express"
import fs from "fs"
import fsPromises from "fs/promises"
import path from "path"
import httpStatus from "http-status"
import { v4 as uuid } from 'uuid'

import { IController } from "../interfaces/controller.interface"
import validate from "../middleware/validate"
import { videoValidation } from "../validation"
import { VideoService } from "../services/video.service"
import { NotFoundError } from "../errors/not-found.error"

export class VideoController implements IController {
    path = '/videos'
    router = express.Router()
    constructor(
        private _videoService: VideoService
    ) {
        this.initializeRoutes()
    }

    public initializeRoutes() {
        this.router.get(this.path, this._getAllVideos)
        this.router.post(this.path, this._startRecording)
        this.router.put(`${this.path}/:id`, validate(videoValidation.uploadChunk), this._uploadChunk)
        this.router.delete(`${this.path}/:id`, validate(videoValidation.deleteVideoRecord), this._deleteVideoRecord)
    }

    private _startRecording: RequestHandler = async (req, res) => {
        const filename = `${uuid()}.webm`
        fs.writeFileSync(path.join(__dirname, '..', '..', 'uploads', filename), '')

        const { id } = await this._videoService.create({ filename })

        res.status(httpStatus.CREATED).json(id)
    }

    private _uploadChunk: RequestHandler = async (req, res) => {
        const { chunk } = req.body
        const { id } = req.params
        const videoDoc = await this._videoService.findOne(id)

        if (!videoDoc) throw new NotFoundError()
        await fsPromises.appendFile(path.join(__dirname, '..', '..', 'uploads', videoDoc.filename), chunk)

        res.send("Successful")
    }

    private _finishRecording: RequestHandler = async (req, res) => {
        const { id } = req.params
        const videoDoc = await this._videoService.findOne(id)
        if (!videoDoc) throw new NotFoundError()

        // Publish file to broker
        // return OK to the FE
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
            transcription: file.transcription
        }))
        res.json(urls)
    }
}
