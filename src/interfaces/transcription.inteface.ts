export abstract class TranscriptionService {
    abstract transcribe(video: string): Promise<string | null>
}