import { Module } from '@nestjs/common';
import { LeadsController } from './leads.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
    controllers: [LeadsController],
    imports: [NatsModule],
})
export class LeadsModule { }
