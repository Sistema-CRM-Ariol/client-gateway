import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { BrandsModule } from './brands/brands.module';
import { CategoriesModule } from './categories/categories.module';
import { ClientsModule } from './clients/clients.module';
import { CompaniesModule } from './companies/companies.module';
import { ExportsModule } from './exports/exports.module';
import { ImportsModule } from './imports/imports.module';
import { InventoriesModule } from './inventories/inventories.module';
import { LeadsModule } from './leads/leads.module';
import { NatsModule } from './transports/nats.module';
import { ProductsModule } from './products/products.module';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';
import { WarehousesModule } from './warehouses/warehouses.module';
import { ProvidersModule } from './providers/providers.module';
import { ProviderCompaniesModule } from './provider-companies/provider-companies.module';

@Module({
    imports: [
        AuthModule, 
        BrandsModule, 
        CategoriesModule, 
        ClientsModule, 
        CompaniesModule, 
        ExportsModule, 
        ImportsModule, 
        InventoriesModule, 
        LeadsModule,
        NatsModule, 
        ProductsModule, 
        ProviderCompaniesModule,
        ProvidersModule,
        RolesModule, 
        UsersModule, 
        WarehousesModule, 
    ],
})
export class AppModule { }
