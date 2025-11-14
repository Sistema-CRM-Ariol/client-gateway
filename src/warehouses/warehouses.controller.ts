import { catchError } from 'rxjs';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { Controller, Get, Post, Body, Patch, Param, Inject, Query, UseGuards } from '@nestjs/common';

import { NATS_SERVICE } from 'src/config';
import { FilterPaginationDto } from 'src/common/dto/filter-pagination.dto';

import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Permissions } from 'src/auth/decorators/permissions.decorator';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';

import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';


@Controller('warehouses')
@UseGuards(AuthGuard)
export class WarehousesController {
    constructor(
        @Inject(NATS_SERVICE) private readonly client: ClientProxy
    ) { }

    @Post()
    @UseGuards(PermissionsGuard)
    @Permissions('warehouses:create')
    create(@Body() createWarehouseDto: CreateWarehouseDto) {
        return this.client.send("createWarehouse", createWarehouseDto)
            .pipe(
                catchError(error => { throw new RpcException(error) })
            )
    }

    @Get()
    @UseGuards(PermissionsGuard)
    @Permissions('warehouses:read')
    findAll(@Query() filterPaginationDto: FilterPaginationDto) {
        return this.client.send("findAllWarehouses", filterPaginationDto)
            .pipe(
                catchError(error => {
                    throw new RpcException(error)
                })
            )
    }

    @Get(':id')
    @UseGuards(PermissionsGuard)
    @Permissions('warehouses:readOne')
    findOne(@Param('id') id: string) {
        return this.client.send("findOneWarehouse", id)
            .pipe(
                catchError(error => { throw new RpcException(error) })
            )
    }

    @Patch(':id')
    @UseGuards(PermissionsGuard)
    @Permissions('warehouses:update')
    update(@Param('id') id: string, @Body() updateWarehouseDto: UpdateWarehouseDto) {
        return this.client.send("updateWarehouse", { id, updateWarehouseDto })
            .pipe(
                catchError(error => { throw new RpcException(error) })
            )
    }
}
