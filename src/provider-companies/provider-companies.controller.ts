import { catchError } from 'rxjs';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { Controller, Get, Post, Body, Patch, Param, Inject, Query } from '@nestjs/common';

import { NATS_SERVICE } from 'src/config';
import { FilterPaginationDto } from 'src/common/dto/filter-pagination.dto';
import { CreateProviderCompanyDto } from './dto/create-provider-company.dto';
import { UpdateProviderCompanyDto } from './dto/update-provider-company.dto';

@Controller('provider-companies')
export class ProviderCompaniesController {
    constructor(
        @Inject(NATS_SERVICE) private readonly client: ClientProxy
    ) { }

    @Post()
    create(@Body() createProviderCompanyDto: CreateProviderCompanyDto) {
        return this.client.send("provider.create.company", createProviderCompanyDto)
            .pipe(
                catchError(error => { throw new RpcException(error) })
            )
    }

    @Get()
    findAll(@Query() filterPaginationDto: FilterPaginationDto) {
        return this.client.send("provider.findAll.company", filterPaginationDto)
            .pipe(
                catchError(error => { throw new RpcException(error) })
            )
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.client.send("provider.findOne.company", id)
            .pipe(
                catchError(error => { throw new RpcException(error) })
            )
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateProviderCompanyDto: UpdateProviderCompanyDto) {
        return this.client.send("provider.update.company", { id, updateProviderCompanyDto })
            .pipe(
                catchError(error => { throw new RpcException(error) })
            )
    }
}
