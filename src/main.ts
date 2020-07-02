import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // cors: { origin: 'http://localhost:3000', credentials: true },
  });
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  });

  await app.listen(process.env.SERVER_PORT, () =>
    console.log(
      `GraphQL server started on http://localhost:${process.env.SERVER_PORT}/graphql`,
    ),
  );
}
bootstrap();
