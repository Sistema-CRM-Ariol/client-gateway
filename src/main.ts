import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { envs } from './config';
import { RpcCustomExceptionFilter } from './common/exceptions/rpc-custom-exception.filter';
import { RpcException } from '@nestjs/microservices';

async function bootstrap() {
  const logger = new Logger("Main-Gateway");
  
  const app = await NestFactory.create(AppModule);
  
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );
  app.enableCors();
  app.useGlobalFilters( new RpcCustomExceptionFilter())

  await app.listen(envs.port);

  logger.log(`Gateway running on port ${envs.port}`);

}
bootstrap();
