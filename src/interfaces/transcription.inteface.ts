export interface ITranscriptionService {
    transcribe(video: string): Promise<string | null>
}