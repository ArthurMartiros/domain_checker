import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const connection = process.env.MESSAGE_QUEUE || 'amqp://localhost:5672';
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [connection],
      queue: 'consumer',
      queueOptions: {
        durable: false
      },
    },
  });
  app.listen(()=>{
    console.log('Rabbitmq Successfuly Connected: ', process.env.MESSAGE_QUEUE);
  })
}
bootstrap();