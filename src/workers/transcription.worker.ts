import { isMainThread, workerData } from 'worker_threads'
import { deepgramService } from '../services/deepgram.service'
import { VideoService } from '../services/video.service'
import Database from '../utils/database.util'
import Video from '../models/video.model'
import { StopRecordingEvent } from '../events/stop-recording.event'

async function runWorker() {
    if (!isMainThread) {
        // Worker thread logic
        const { filepath, id } = workerData as StopRecordingEvent['data']
        try {
            const transcript = await getTranscription(filepath) ?? ''
            await PersistInDB(id, transcript)
            console.log('Worker finished')
        } catch (error) {
            console.log(error)
        }
    }
}

async function getTranscription(filepath: string) {
    const transcript = await deepgramService.transcribe(filepath)
    return transcript
}

async function PersistInDB(id: string, transcript: string) {
    const db = new Database(process.env.DB_URI!)
    try {
        await db.connect()
    } catch (error) {
        throw new Error('Could not connect to DB from Worker')
    }
    const updatedVideo = await new VideoService(Video).update(id, { transcription: transcript })
    if (!updatedVideo) throw new Error("Something unexpected happened")
    await db.disconnect()
}

runWorker()