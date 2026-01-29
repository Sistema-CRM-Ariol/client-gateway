import { Controller, Post, Body, Inject, Get, Query, UseGuards } from '@nestjs/common';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { InventoryAdjustmentDto } from './dto/inventory-adjustment.dto';
import { FilterPaginationDto } from 'src/common/dto/filter-pagination.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { Permissions } from 'src/auth/decorators/permissions.decorator';
import { User } from 'src/auth/decorators/user.decorator';


@UseGuards(AuthGuard)
@Controller('inventories')
export class InventoriesController {
    constructor(
        @Inject(NATS_SERVICE) private readonly natsClient: ClientProxy
    ) { }

    
    @Post('adjustments')
    @UseGuards(PermissionsGuard)
    @Permissions('inventories:create')
    async adjustments(@Body() inventoryAdjustmentDto: InventoryAdjustmentDto, @User() user) {
        return this.natsClient.send('inventory.adjustments', { ...inventoryAdjustmentDto, userId: user.id, userName: user.name })
            .pipe(
                catchError(err => {
                    throw new RpcException(err.message);
                })
            );
    }

    @Get('movements')
    @UseGuards(PermissionsGuard)
    @Permissions('inventories:read')
    async movements(@Query() filterPaginationDto: FilterPaginationDto) {
        return this.natsClient.send('inventory.movements', filterPaginationDto).pipe(
            catchError(err => {
                throw new RpcException(err.message);
            })
        );
    }
}
