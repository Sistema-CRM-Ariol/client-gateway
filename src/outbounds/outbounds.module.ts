import { Module } from '@nestjs/common';
import { OutboundsController } from './outbounds.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
    controllers: [OutboundsController],
    imports: [NatsModule],
})
export class OutboundsModule { }
