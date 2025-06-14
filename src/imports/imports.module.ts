import { Module } from '@nestjs/common';
import { ImportsController } from './imports.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [ImportsController],
  imports: [NatsModule],
})
export class ImportsModule {}
