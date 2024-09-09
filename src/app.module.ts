import { Module } from '@nestjs/common';
import { ClientsModule } from './clients/clients.module';
import { NatsModule } from './transports/nats.module';
import { ProductsModule } from './products/products.module';
import { BrandsModule } from './brands/brands.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [ClientsModule, NatsModule, ProductsModule, BrandsModule, CategoriesModule ],
})
export class AppModule {}
