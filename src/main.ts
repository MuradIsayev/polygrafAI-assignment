import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  const PORT = parseInt(process.env.PORT);
  await app.listen(PORT, () => console.log(` App is running on port ${PORT}`));
}
bootstrap();
