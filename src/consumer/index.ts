import { Message } from 'amqplib'
import dotenv from 'dotenv'

import { QueueClient } from '../shared/rabbitmq'
import { ConfigConstants, PaymentRequest, PaymentResponse, PaymentStatus } from '../shared/types'

dotenv.config()

const queue = QueueClient.getInstance()
const config: ConfigConstants = {
    PAYMENT_QUEUE: "payments-queue"
}

const messageHandler = (message: Message) => {
    console.log("Message receive", JSON.parse(message.content.toString()))
}

const listenerStart = () => {

    if (!queue.ready) {
        setTimeout(() => {
            listenerStart()
        }, 5000)
        return
    }

    queue.consume(config.PAYMENT_QUEUE, messageHandler)
}

listenerStart()

console.log(`Listening to queue ${config.PAYMENT_QUEUE}`)

