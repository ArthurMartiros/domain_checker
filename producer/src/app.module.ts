import {  Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport} from '@nestjs/microservices';
import { CsvModule } from 'nest-csv-parser'
import configuration from './config/configuration';
import { ConfigModule } from '@nestjs/config';

const connection = process.env.MESSAGE_QUEUE || 'amqp://localhost:5672';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    ClientsModule.register([
      {
        name: 'MIC_CLIENT',
        transport: Transport.RMQ ,
        options: {
          urls: [connection],
          queue: 'consumer',
          queueOptions: {
            durable: false
          },
        },
      },
    ]),
    CsvModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
