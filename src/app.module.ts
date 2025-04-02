import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { BrandsModule } from './brands/brands.module';
import { NatsModule } from './transports/nats.module';
import { ClientsModule } from './clients/clients.module';
import { ProductsModule } from './products/products.module';
import { ProvidersModule } from './providers/providers.module';
import { CompaniesModule } from './companies/companies.module';
import { CategoriesModule } from './categories/categories.module';
import { WarehousesModule } from './warehouses/warehouses.module';

@Module({
  imports: [ClientsModule, NatsModule, ProductsModule, BrandsModule, CategoriesModule, ProvidersModule, AuthModule, CompaniesModule, WarehousesModule ],
})
export class AppModule {}
