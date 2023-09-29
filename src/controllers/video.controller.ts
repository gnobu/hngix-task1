import express from "express"
import fs from "fs"
import path from "path"
import httpStatus from "http-status"

import { IController } from "../interfaces/controller.interface"
import { ICloudStorage } from "../interfaces/ICloudStorage.interface"
import { fileUpload } from "../middleware/imageUpload.middleware"
import validate from "../middleware/validate"
import { videoValidation } from "../validation"

export class VideoController implements IController {
    path = '/api'
    router = express.Router()
    private _cloudStorageService
    constructor(cloudStorageService: ICloudStorage) {
        this._cloudStorageService = cloudStorageService
        this.initializeRoutes()
    }

    public initializeRoutes() {
        this.router.post(
            `${this.path}/videos`,
            fileUpload.single('video'),
            validate(videoValidation.createVideoRecord),
            this._createVideoRecord
        )
    }

    private _createVideoRecord = async (req: express.Request, res: express.Response) => {
        const { title } = req.body
        const video = req.file
        const extension = path.extname(video!.originalname)
        const newPath = path.join(video!.destination, title + extension)
        fs.renameSync(video!.path, newPath)

        // TODO: validate file name conflict

        this._cloudStorageService.uploadVideo(newPath, title, 'video')
        // if (!isSuccess) {
        //     return res.status(httpStatus.CREATED)
        //         .json({ message: "Video uploaded, but without backup", url: newPath })
        // }

        const publicURL = `${process.env.BASE_URL}/video/${title + extension}`
        res.status(httpStatus.CREATED).json({ message: "Video uploaded successfully", url: publicURL })
    }
    // TODO: Fetch all videos
    // TODO: Fetch single video
    // TODO: Delete video
}
