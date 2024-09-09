import { Module } from '@nestjs/common';
import { BrandsController } from './brands.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [BrandsController],
  imports: [
    NatsModule
  ]
})
export class BrandsModule {}
