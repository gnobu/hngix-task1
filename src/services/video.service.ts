import { FilterQuery, UpdateQuery } from "mongoose"
import { VideoAttrs, VideoModel } from "../models/video.model"

export class VideoService {
    constructor(private _videoModel: VideoModel) { }
    async create(dto: VideoAttrs) {
        const video = this._videoModel.build(dto)
        await video.save()
        return video
    }
    async findMany(filter?: FilterQuery<VideoModel>) {
        return await this._videoModel.find({ ...filter })
    }
    async findOne(id: string) {
        return await this._videoModel.findById(id)
    }
    async update(id: string, fields: UpdateQuery<VideoModel>) {
        return await this._videoModel.findByIdAndUpdate(id, fields, { new: true, runValidators: true })
    }
    async delete(id: string) {
        const video = await this._videoModel.findByIdAndDelete(id)
        return video
    }
}