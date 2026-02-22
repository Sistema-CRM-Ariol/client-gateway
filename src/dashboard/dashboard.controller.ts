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
            leads: this.client.send('leads.stats', {}).pipe(
                catchError(error => { throw new RpcException(error) })
            ),
            imports: this.client.send('imports.stats', {}).pipe(
                catchError(error => { throw new RpcException(error) })
            ),
            sales: this.client.send('outbounds.sales.stats', {}).pipe(
                catchError(error => { throw new RpcException(error) })
            ),
            quotations: this.client.send('outbounds.quotations.stats', {}).pipe(
                catchError(error => { throw new RpcException(error) })
            ),
            users: this.client.send('users.stats', {}).pipe(
                catchError(error => { throw new RpcException(error) })
            ),
            providers: this.client.send('providers.stats', {}).pipe(
                catchError(error => { throw new RpcException(error) })
            ),
        });
    }


}
