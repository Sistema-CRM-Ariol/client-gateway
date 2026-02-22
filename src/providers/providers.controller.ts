import { catchError } from 'rxjs';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { Controller, Get, Post, Body, Patch, Param, Inject, Query, UseGuards } from '@nestjs/common';

import { NATS_SERVICE } from 'src/config';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { Permissions } from 'src/auth/decorators/permissions.decorator';

import { UpdateProviderDto } from './dto/update-provider.dto';
import { CreateProviderDto } from './dto/create-provider.dto';
import { FilterPaginationDto } from 'src/common/dto/filter-pagination.dto';

@Controller('providers')
@UseGuards(AuthGuard)
export class ProvidersController {
    constructor(
        @Inject(NATS_SERVICE) private readonly client: ClientProxy
    ) { }

    @Get('stats')
    getStats() {
        return this.client.send("providers.stats", {})
            .pipe(
                catchError(error => { throw new RpcException(error) })
            )
    }

    @Post()
    @UseGuards(PermissionsGuard)
    @Permissions('providers:create')
    create(@Body() createProviderDto: CreateProviderDto) {
        return this.client.send("providers.create", createProviderDto)
            .pipe(
                catchError(error => { throw new RpcException(error) })
            )
    }

    @Get()
    @UseGuards(PermissionsGuard)
    @Permissions('providers:read')
    findAll(@Query() filterPaginationDto: FilterPaginationDto) {
        return this.client.send("providers.findAll", filterPaginationDto).pipe(
            catchError(error => { throw new RpcException(error) })
        )
    }

    @Get(':id')
    @UseGuards(PermissionsGuard)
    @Permissions('providers:readOne')
    findOne(@Param('id') id: string) {
        return this.client.send("providers.findOne", id)
            .pipe(
                catchError(error => { throw new RpcException(error) })
            )
    }

    @Patch(':id')
    @UseGuards(PermissionsGuard)
    @Permissions('providers:update')
    update(@Param('id') id: string, @Body() updateProviderDto: UpdateProviderDto) {
        return this.client.send("providers.update", { id, updateProviderDto })
            .pipe(
                catchError(error => { throw new RpcException(error) })
            )
    }
}
