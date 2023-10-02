import mongoose from "mongoose"

export interface VideoAttrs {
    filename: string
}

export interface IVideo extends mongoose.Document {
    filename: string
    transcription: string
}

export interface VideoModel extends mongoose.Model<IVideo> {
    build(attrs: VideoAttrs): IVideo
}

const videoSchema = new mongoose.Schema<IVideo, VideoModel>({
    filename: { type: String, required: true, unique: true },
    transcription: { type: String, default: '' }
}, {
    toJSON: {
        getters: true,
        transform(doc, ret, options) {
            delete ret._id
            delete ret.__v
        },
    },
    toObject: { getters: true }
})

videoSchema.statics.build = (attrs: VideoAttrs) => {
    return new Video(attrs)
}

const Video = mongoose.model<IVideo, VideoModel>('Video', videoSchema)
export default Video