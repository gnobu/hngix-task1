import { v2 as cloudinary } from 'cloudinary'
import { ICloudStorage } from '../interfaces/ICloudStorage.interface'

class CloudinaryService implements ICloudStorage {
    constructor() {
        cloudinary.config({
            cloud_name: process.env.CLOUDNAME,
            api_key: process.env.CLOUDAPIKEY,
            api_secret: process.env.CLOUDINARYSECRET,
            secure: true
        })
    }

    async uploadImage(imageToUpload: string, filename: string, folder: string) {
        try {
            const uploadResponse = await cloudinary.uploader.upload(
                imageToUpload,
                {
                    public_id: filename,
                    folder: `HNGx-task5/${folder}`
                }
            )

            const { secure_url } = uploadResponse
            if (!secure_url) throw new Error("Could not uplaod image.")

            return {
                isSuccess: true,
                message: "Successfully uploaded image.",
                imageURL: secure_url,
            }
        } catch (error) {
            console.log(error)
            return {
                isSuccess: false,
                message: "Internal Server Error",
            }
        }
    }

    async deleteImage(publicId: string) {
        try {
            const uploadResponse = await cloudinary.uploader.destroy(publicId)
            if (!uploadResponse.result) throw new Error("Could not uplaod image.")

            return {
                isSuccess: true,
                message: "Successfully deleted image",
            }
        } catch (error) {
            console.log(error)
            return {
                isSuccess: false,
                message: "Could not delete image",
            }
        }
    }

    async uploadVideo(videoToUpload: string, filename: string, folder: string) {
        try {
            const uploadResponse = await cloudinary.uploader.upload(
                videoToUpload,
                {
                    resource_type: "video",
                    public_id: filename,
                    chunk_size: 6000000,
                    folder: `HNGx-task5/${folder}`
                }
            )

            const { secure_url } = uploadResponse
            if (!secure_url) throw new Error("Could not uplaod video.")

            return {
                isSuccess: true,
                message: "Successfully uploaded video.",
                videoURL: secure_url,
            }
        } catch (error) {
            console.log(error)
            return {
                isSuccess: false,
                message: "Internal Server Error",
            }
        }
    }
}

export const Cloudinary = new CloudinaryService()