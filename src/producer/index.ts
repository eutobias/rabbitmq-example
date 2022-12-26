import dotenv from 'dotenv'
import express, { Express, Request, Response } from 'express'
import { sendToQueue } from '../shared/rabbitmq'
import { ConfigConstants, PaymentRequest } from '../shared/types'

dotenv.config()

const config:ConfigConstants = {
    PAYMENT_QUEUE:"payments-queue"
}

const app: Express = express()
const port: string = process.env.PRODUCER_PORT || "3000"

app.post('/pay', async (req:Request, res: Response) => {
    const body:PaymentRequest = req.body
    
    const sent = await sendToQueue(config.PAYMENT_QUEUE, body)
})


app.listen(port, () => {
    console.log(`Listening to port ${port} at http://localhost:${port}`)
})