import { Module } from '@nestjs/common';
import { ClientsController } from './clients.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [ClientsController],
  imports: [
    NatsModule
  ]

})
export class ClientsModule {}
