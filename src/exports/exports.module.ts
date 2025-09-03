import { Module } from '@nestjs/common';
import { ExportsController } from './exports.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [ExportsController],
  imports: [NatsModule],
})
export class ExportsModule {}
