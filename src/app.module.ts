import { Module } from '@nestjs/common';
import { ClientsModule } from './clients/clients.module';
import { NatsModule } from './transports/nats.module';
import { ProductsModule } from './products/products.module';
import { BrandsModule } from './brands/brands.module';
import { CategoriesModule } from './categories/categories.module';
import { ProvidersModule } from './providers/providers.module';
import { AuthModule } from './auth/auth.module';
import { CompaniesModule } from './companies/companies.module';

@Module({
  imports: [ClientsModule, NatsModule, ProductsModule, BrandsModule, CategoriesModule, ProvidersModule, AuthModule, CompaniesModule ],
})
export class AppModule {}
