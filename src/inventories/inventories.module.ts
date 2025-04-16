import { Module } from '@nestjs/common';
import { InventoriesGateway } from './inventories.gateway';
import { NatsModule } from 'src/transports/nats.module';
import { InventoriesController } from './inventories.controller';
import { InventoriesService } from './inventories.service';

@Module({
  providers: [InventoriesGateway, InventoriesService],
  imports: [NatsModule],
  controllers: [InventoriesController],
})
export class InventoriesModule {}
