import amqp, {Channel} from 'amqplib/callback_api';

const RABBITMQ_URL:string = process.env.RABBITMQ_URL || "";

let mqChannel:Channel;
amqp.connect(RABBITMQ_URL, function (err, conn) {
   if (err)
      return console.log(err)

   conn.createChannel(function (err, channel) {
      mqChannel = channel;
   });
});

export const sendToQueue = async (queueName:string, data:any):Promise<boolean> => {
   return await mqChannel.sendToQueue(queueName, Buffer.from(data));
}

process.on('exit', (code) => {
   mqChannel.close(() => {});
   console.log(`Closing rabbitmq channel`);
});
