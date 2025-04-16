import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { EventPattern, Payload } from '@nestjs/microservices';

@WebSocketGateway({ namespace: '/inventories', cors: true })
export class InventoriesGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  handleConnection(client: any) {
    console.log('Cliente conectado: ', client.id);
  }

  @EventPattern('inventory.created')
  handleInventoryCreated(@Payload() data: any) {
    this.server.emit('inventoryCreated', data);
  }

  @EventPattern('inventory.updated')
  handleInventoryUpdated(@Payload() data: any) {
    this.server.emit('inventoryUpdated', data);
  }

  @EventPattern('inventory.deleted')
  handleInventoryDeleted(@Payload() data: any) {
    this.server.emit('inventoryDeleted', data);
  }
}
