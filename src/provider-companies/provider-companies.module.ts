import { Module } from '@nestjs/common';
import { NatsModule } from 'src/transports/nats.module';

import { ProviderCompaniesController } from './provider-companies.controller';

@Module({
    controllers: [ProviderCompaniesController],
    imports: [NatsModule],
})
export class ProviderCompaniesModule { }
