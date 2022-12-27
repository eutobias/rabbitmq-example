import dotenv from 'dotenv'
import express, { Express, Request, Response } from 'express'
import bodyParser from 'body-parser'

import { QueueClient } from '../shared/rabbitmq'
import { ConfigConstants, PaymentRequest, PaymentResponse, PaymentStatus } from '../shared/types'

dotenv.config()

const queue = new QueueClient()
const config:ConfigConstants = {
    PAYMENT_QUEUE:"payments-queue"
}

const app: Express = express()
const port: string = process.env.PRODUCER_PORT || "3000"

app.use(bodyParser.json())

app.post('/pay', async (req:Request, res: Response) => {
    const body:PaymentRequest = req.body    
    const sent = await queue.send(config.PAYMENT_QUEUE, body)

    const paymentResponse: PaymentResponse = {
        paymentStatus: sent ? PaymentStatus.PROCESSING : PaymentStatus.FAILED_SENT
    }
    res.json(paymentResponse)
})


app.listen(port, () => {
    console.log(`Listening to port ${port} at http://localhost:${port}`)
})