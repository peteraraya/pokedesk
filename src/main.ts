import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });

  // aqui se puede configurar el prefijo de la api
  app.setGlobalPrefix('api/v2');

  // Configuración global de pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true, // transformar los tipos de datos a JSON (por defecto)
      transformOptions: {
        enableImplicitConversion: true, // transformar los tipos de datos a JSON (por defecto)
      },
    })
  );


  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
