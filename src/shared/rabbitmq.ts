import amqp, { Channel, Connection } from 'amqplib/callback_api';
import { QueueMessageCallback } from './types';

class QueueClient {

   private RABBITMQ_URL: string
   private connection: Connection | undefined;
   private channel: Channel | undefined;
   private static instance: QueueClient;

   public ready: boolean = false;

   private constructor() {
      this.RABBITMQ_URL = process.env.RABBITMQ_URL || ""

      if (this.channel)
         return

      amqp.connect(this.RABBITMQ_URL, (err, conn) => {
         if (err)
            throw (err)
         this.connection = conn

         this.connection.createChannel((err, channel) => {
            this.channel = channel;
            this.ready = true;

            process.once('SIGINT', async () => {
               if (this.channel)
                  this.channel.close(()=>{});

               if (this.connection)
                  this.connection.close();
            });
         });
      });
   }

   public static getInstance(): QueueClient {
      if (!QueueClient.instance) {
         QueueClient.instance = new QueueClient();
      }

      return QueueClient.instance;
   }

   public async send(queueName: string, data: any): Promise<boolean> {
      if (!this.channel)
         throw new Error("Queue client not connected")

      const buffer = Buffer.from(JSON.stringify(data))
      return await this.channel.sendToQueue(queueName, buffer, { persistent: true });
   }

   public async consume(queueName: string, callback: QueueMessageCallback) {
      if (!this.channel)
         throw new Error("Queue client not connected")

      this.channel.consume(queueName, (message) => {
         if (message && this.channel) {
            this.channel.ack(message)
            callback(message)
         }
      })
   }
}

export { QueueClient }