import path from 'path'
import { Worker } from 'worker_threads'
import { QUEUE_NAME } from "../../utils/amqpWrapper"
import { StopRecordingEvent } from "../stop-recording.event"
import { Subjects } from "../subjects"
import { Listener } from "./listener"

export class StopRecordingListener extends Listener<StopRecordingEvent> {
  subject = Subjects.stopRecording
  queueName = QUEUE_NAME

  async processJob(data: StopRecordingEvent['data']) {
    const pathToWorker = path.join(__dirname, '..', '..', 'workers', 'transcription.worker')
    const worker = new Worker(pathToWorker, { workerData: data })
  }
}