import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [
          "amqps://fpnlysiy:WlKoGJhseLHmiTx4-s1Rtk9oEJT00CkL@whale.rmq.cloudamqp.com/fpnlysiy",
        ],
        queue: "main_products_queue",
        queueOptions: {
          durable: false,
        },
      },
    }
  );
  app.listen()
}
bootstrap();
