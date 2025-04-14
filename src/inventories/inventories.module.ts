import { Module } from '@nestjs/common';
import { InventoriesService } from './inventories.service';
import { InventoriesGateway } from './inventories.gateway';

@Module({
  providers: [InventoriesGateway, InventoriesService],
})
export class InventoriesModule {}
