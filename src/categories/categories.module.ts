import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { NatsModule } from '../transports/nats.module';

@Module({
  controllers: [CategoriesController],
  imports: [NatsModule]
})
export class CategoriesModule {}
