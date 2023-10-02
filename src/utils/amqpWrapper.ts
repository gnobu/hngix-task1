import amqp from 'amqplib'

export const QUEUE_NAME = "video-recording-queue"

class AmqpWrapper {
    private _connection?: amqp.Connection
    private _channel?: amqp.Channel

    get channel() {
        if (!this._channel) {
            throw new Error('Cannot access AMQP channel before connecting')
        }
        return this._channel
    }

    get connection() {
        if (!this._connection) {
            throw new Error('Cannot access AMQP connection before connecting')
        }
        return this._connection
    }

    async connectQueue(url: string = "amqp://localhost:5672") {
        try {
            this._connection = await amqp.connect(url)
            this._channel = await this._connection.createChannel()

            await this._channel.assertQueue(QUEUE_NAME)
            console.log('Connected to AMQP!')
        } catch (error) {
            console.log(error)
        }
    }
}

export const amqpWrapper = new AmqpWrapper()