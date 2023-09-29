export interface ICloudStorage {
    uploadImage(imageToUpload: string, filename: string, folder: string): Promise<{
        isSuccess: boolean;
        message: string;
        imageURL?: string;
    }>
    
    uploadVideo(videoToUpload: string, filename: string, folder: string): Promise<{
        isSuccess: boolean;
        message: string;
        videoURL?: string;
    }>
    
    deleteImage(publicId: string): Promise<{
        isSuccess: boolean;
        message: string;
    }>
}