import { Module } from '@nestjs/common';
import { NatsModule } from 'src/transports/nats.module';
import { WarehousesController } from './warehouses.controller';

@Module({
  imports: [NatsModule],
  controllers: [WarehousesController],
})
export class WarehousesModule {}
