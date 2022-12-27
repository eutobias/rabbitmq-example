import amqp, { Channel } from 'amqplib/callback_api';

class QueueClient {

   RABBITMQ_URL: string
   channel: Channel | undefined;

   constructor() {
      this.RABBITMQ_URL = process.env.RABBITMQ_URL || ""

      amqp.connect(this.RABBITMQ_URL, (err, conn) => {
         if (err)
            throw (err)

         conn.createChannel((err, channel) => {
            this.channel = channel;
         });
      });
   }

   async send(queueName: string, data: any): Promise<boolean> {
      console.log("data: ", data);
      console.log("queueName: ", queueName);
      if (!this.channel)
         throw new Error("Queue client not connected")

      const buffer = Buffer.from(JSON.stringify(data))
      return await this.channel.sendToQueue(queueName, buffer);
   }
}

export { QueueClient }