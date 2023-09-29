import express, { RequestHandler } from "express"
import fs from "fs"
import path from "path"
import httpStatus from "http-status"

import { IController } from "../interfaces/controller.interface"
import { ICloudStorage } from "../interfaces/ICloudStorage.interface"
import { fileUpload } from "../middleware/imageUpload.middleware"
import validate from "../middleware/validate"
import { videoValidation } from "../validation"

export class VideoController implements IController {
    path = '/videos'
    router
    private _cloudStorageService
    constructor(cloudStorageService: ICloudStorage) {
        this.router = express.Router()
        this._cloudStorageService = cloudStorageService
        this.initializeRoutes()
    }

    public initializeRoutes() {
        this.router.get(this.path, this._getAllVideos)
        this.router.post(this.path, fileUpload.single('video'), validate(videoValidation.createVideoRecord), this._createVideoRecord)
        this.router.delete(`${this.path}/:title`, validate(videoValidation.deleteVideoRecord), this._deleteVideoRecord)
    }

    private _createVideoRecord: RequestHandler = async (req, res) => {
        const { title } = req.body
        const video = req.file
        const extension = path.extname(video!.originalname)
        const newPath = path.join(video!.destination, title + extension)

        // TODO: validate file name conflict
        fs.renameSync(video!.path, newPath)
        this._cloudStorageService.uploadVideo(newPath, title, 'video')

        const publicURL = `${process.env.BASE_URL}/video/${title + extension}`
        res.status(httpStatus.CREATED).json({ message: "Video uploaded successfully", url: publicURL })
    }

    private async _getAllVideos(req: express.Request, res: express.Response) {
        const destination = path.join(__dirname, '..', '..', 'uploads')
        const files = fs.readdirSync(destination)
        const urls = files.map(file => `${process.env.BASE_URL}/video/${file}`)
        res.json(urls)
    }

    private _deleteVideoRecord: RequestHandler = async (req, res) => {
        const { title } = req.params

        const destination = path.join(__dirname, '..', '..', 'uploads')
        const files = fs.readdirSync(destination)
        const fileName = files.filter(fileName => new RegExp(title).test(fileName))[0]

        if (fileName) {
            fs.unlinkSync(`${destination}\\${fileName}`)
            this._cloudStorageService.deleteImage(title)
            return res.json({ message: "Video deleted successfully" })
        }

        res.status(httpStatus.NO_CONTENT).send("No content")
    }
}
