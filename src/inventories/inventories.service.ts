import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { WarehouseFilterPaginatedDto } from './dto/warehouse-filter-paginated.dto';
import { catchError, firstValueFrom } from 'rxjs';
import { RpcException } from '@nestjs/microservices';
import { InventoriesGateway } from './inventories.gateway';

@Injectable()
export class InventoriesService {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy,
    private readonly gateway: InventoriesGateway,
  ) { }

  async findAll(query: WarehouseFilterPaginatedDto) {
    return firstValueFrom(
      this.client.send('findAllInventories', query).pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      ),
    );
  }

  async create(dto: CreateInventoryDto) {
    try {
      const created = await firstValueFrom(
        this.client.send('createInventory', dto)
      );
      
      this.gateway.server.emit('inventoryCreated', created);
      
      return created;
      
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateInventoryDto: UpdateInventoryDto) {
    const updated = await firstValueFrom(
      this.client.send('updateInventory', { id, updateInventoryDto })
    );
    
    this.gateway.server.emit('inventoryUpdated', updated);
    return updated;
  }

  async remove(id: number) {
    const deleted = await firstValueFrom(this.client.send('removeInventory', id));
    this.gateway.server.emit('inventoryDeleted', { id });
    return deleted;
  }
}
