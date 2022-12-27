# rabbitmq-example

Simple study using Rabbit MQ, it has the producer and a consumer example, you must have a rabbitMQ server working to test this, 
I've recomend *CloudAMQP* because of his free plans, to signup just follow the steps:

## Get a free rabbitMQ test server

1. go to the site [CloudAMQP](https://www.cloudamqp.com/plans.html)
2. click in **Get Started** on the header
3. scrolldown to find the free plan **Little Lemur**
4. complete the registration process

## Running this example

1. Rename .env-example to .env and edit the constant **RABBITMQ_UR**
```env
RABBITMQ_URL="amqps://user:password@host/name"
PRODUCER_PORT="30001"
```

2. Create a queue on rabbitMQ server with name **payments-queue**. 

![image](https://user-images.githubusercontent.com/72179/209598009-e4157089-4cd3-405f-882e-dd2dc367df7b.png)
*You can create any other name do you want, but then you need to edit the files and change it.*

3. Open the terminal and run the producer and consumer
```shell
npm run dev:producer
```
```shell
npm run dev:consumer
```

4. Open Postman or any other API tester app you have and do a request with the current settings:

```json
//Method: Post
//URL: http://localhost:30001/pay
//Body: JSON

{
    "userId": 1233,
    "purchaseId": 1302,
    "paymentAmount": 23530,
    "paymentType": "CREDITCARD"
}
```

Then you will see the message been consumed by the consumer in the terminal.

That´s it, i hopw it help someone.
