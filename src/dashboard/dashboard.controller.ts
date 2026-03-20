import { catchError, forkJoin } from 'rxjs';
import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';

import { NATS_SERVICE } from 'src/config';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('dashboard')
@UseGuards(AuthGuard)
export class DashboardController {

    constructor(
        @Inject(NATS_SERVICE) private readonly client: ClientProxy
    ) { }

    // ─── Obtener todas las estadísticas del dashboard ───────────────
    @Get()
    getAll() {
        return forkJoin({
            // Clientes: KPIs generales + chart 6 meses + top 5
            clients: this.client.send('clients.stats', {}).pipe(
                catchError(err => { throw new RpcException(err); })
            ),
            clientsDashboard: this.client.send('clients.dashboard', {}).pipe(
                catchError(err => { throw new RpcException(err); })
            ),

            // Leads: KPIs + funnel + chart 6 meses + distribución por fuente
            leads: this.client.send('leads.stats', {}).pipe(
                catchError(err => { throw new RpcException(err); })
            ),
            leadsDashboard: this.client.send('leads.dashboard', {}).pipe(
                catchError(err => { throw new RpcException(err); })
            ),

            // Ventas: KPIs + chart 12 meses + top clientes + best sellers
            sales: this.client.send('outbounds.sales.stats', {}).pipe(
                catchError(err => { throw new RpcException(err); })
            ),
            salesDashboard: this.client.send('outbounds.sales.dashboard', {}).pipe(
                catchError(err => { throw new RpcException(err); })
            ),

            // Cotizaciones: KPIs + chart conversión 6 meses
            quotations: this.client.send('outbounds.quotations.stats', {}).pipe(
                catchError(err => { throw new RpcException(err); })
            ),
            quotationsDashboard: this.client.send('outbounds.quotations.dashboard', {}).pipe(
                catchError(err => { throw new RpcException(err); })
            ),

            // Importaciones
            imports: this.client.send('imports.stats', {}).pipe(
                catchError(err => { throw new RpcException(err); })
            ),

            // Proveedores
            providers: this.client.send('providers.stats', {}).pipe(
                catchError(err => { throw new RpcException(err); })
            ),

            // Productos: overview + por marca/categoría + recientes
            products: this.client.send('products.dashboard', {}).pipe(
                catchError(err => { throw new RpcException(err); })
            ),

            // Inventario: alertas de stock bajo
            lowStock: this.client.send('inventories.lowStock', {}).pipe(
                catchError(err => { throw new RpcException(err); })
            ),
        });
    }


}
