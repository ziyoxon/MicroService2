import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3001, () => {
    console.log("Backend 2 3001 portda ishga tushdi");
    
  });
}
bootstrap();
