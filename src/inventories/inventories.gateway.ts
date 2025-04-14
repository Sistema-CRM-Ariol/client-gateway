import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';
import { InventoriesService } from './inventories.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { Server } from 'socket.io';

@WebSocketGateway({ namespace: '/inventories' })
export class InventoriesGateway {
  constructor(private readonly inventoriesService: InventoriesService) {}

  @WebSocketServer()
  server: Server;


  @SubscribeMessage('createInventory')
  create(@MessageBody() createInventoryDto: CreateInventoryDto) {
    return this.inventoriesService.create(createInventoryDto);
  }

  @SubscribeMessage('findAllInventories')
  findAll() {
    return this.inventoriesService.findAll();
  }

  @SubscribeMessage('findOneInventory')
  findOne(@MessageBody() id: number) {
    return this.inventoriesService.findOne(id);
  }

  // @SubscribeMessage('updateInventory')
  // update(@MessageBody() updateInventoryDto: UpdateInventoryDto) {
  //   return this.inventoriesService.update(updateInventoryDto.id, updateInventoryDto);
  // }
}
