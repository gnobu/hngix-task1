import fs from "fs"
import { Deepgram } from "@deepgram/sdk"
import { TranscriptionService } from "../interfaces/transcription.inteface"

class DeepgramService implements TranscriptionService {
    constructor(private _deepgram = new Deepgram(process.env.DEEPGRAM_API_KEY!)) { }
    transcribe = async (filepath: string) => {
        const source = {
            buffer: fs.readFileSync(filepath),
            mimetype: "video/webm",
        }

        try {
            const { results } = await this._deepgram.transcription.preRecorded(source, {
                smart_format: true,
                model: "nova",
            })
            return results?.channels[0].alternatives[0].transcript ?? null
        } catch (err) {
            console.log(err)
            return null
        }
    }

}

export const deepgramService = new DeepgramService()