import { StopRecordingEvent } from "../stop-recording.event"
import { Subjects } from "../subjects"
import { Publisher } from "./publisher"

export class StopRecordingPublisher extends Publisher<StopRecordingEvent> {
    subject = Subjects.stopRecording
}