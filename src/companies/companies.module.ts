import { Module } from '@nestjs/common';
import { CompaniesController } from './companies.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [CompaniesController],
  imports: [NatsModule]
})
export class CompaniesModule {}
