import { Module } from '@nestjs/common';
import { ProvidersController } from './providers.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [ProvidersController],
  imports: [NatsModule]
})
export class ProvidersModule {}
