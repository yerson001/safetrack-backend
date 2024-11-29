import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({forbidNonWhitelisted:false}));
  //await app.listen(process.env.PORT ?? 3000);
  await app.listen(process.env.PORT ?? 3000, '192.168.137.140');

}
bootstrap();

//192.168.0.110   -->   192.168.137.140