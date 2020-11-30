import { Module,HttpModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { DomainService } from './services/domain.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Domain } from './entities/domain.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    HttpModule,
    TypeOrmModule.forFeature([Domain]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      synchronize: true,
      host: process.env.DATABASE_URL,
      entities: [Domain],
    }),
  ],
  controllers: [AppController],
  providers: [DomainService],
})
export class AppModule {}
