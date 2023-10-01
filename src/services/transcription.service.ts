import fs from 'fs'
import OpenAI from 'openai'
import { ITranscriptionService } from '../interfaces/transcription.inteface'

export class OpenAIService implements ITranscriptionService {
    private _openai
    constructor() {
        this._openai = new OpenAI({
            apiKey: process.env["OPENAI_API_KEY"]
        })
    }
    transcribe = async (filename: string) => {
        try {
            const transcript = await this._openai.audio.transcriptions.create({
                file: fs.createReadStream(filename),
                model: 'whisper-1'
            })
            return transcript.text
        } catch (error) {
            console.log(error)
            return null
        }
    }
}

export default new OpenAIService()