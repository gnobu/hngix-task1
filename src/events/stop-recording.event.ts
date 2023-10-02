import { Subjects } from "./subjects"

export interface StopRecordingEvent {
    subject: Subjects.stopRecording
    data: {
        id: string
        filepath: string
    }
}