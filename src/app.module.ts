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
import { InventoriesModule } from './inventories/inventories.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { ImportsModule } from './imports/imports.module';
import { ExportsModule } from './exports/exports.module';

@Module({
  imports: [ClientsModule, NatsModule, ProductsModule, BrandsModule, CategoriesModule, ProvidersModule, AuthModule, CompaniesModule, WarehousesModule, InventoriesModule, UsersModule, RolesModule, ImportsModule, ExportsModule],
})
export class AppModule { }
