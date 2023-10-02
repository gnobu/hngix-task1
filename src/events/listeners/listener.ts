import amqp from 'amqplib'
import { Subjects } from '../subjects'

interface Event {
    subject: Subjects;
    data: any;
}

export abstract class Listener<T extends Event> {
    abstract subject: T['subject']
    abstract queueName: string
    abstract processJob(data: T['data']): Promise<void>
    protected channel: amqp.Channel

    constructor(channel: amqp.Channel) {
        this.channel = channel
    }

    listen() {
        console.log(`Listening on queue: ${this.queueName}`)
        this.channel.consume(this.queueName, async (msg) => {
            if (msg !== null) {
                const data = JSON.parse(msg.content.toString())
                await this.processJob(data)

                // Acknowledge the message
                console.log("Listener: Acknowledging message complete")
                this.channel.ack(msg)
            }
        })
    }
}
