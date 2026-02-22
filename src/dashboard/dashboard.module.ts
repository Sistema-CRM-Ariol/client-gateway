import { Module } from '@nestjs/common';
import { NatsModule } from 'src/transports/nats.module';
import { DashboardController } from './dashboard.controller';

@Module({
    controllers: [DashboardController],
    imports: [NatsModule],
})
export class DashboardModule { }
