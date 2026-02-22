import { ClientProxy, RpcException } from '@nestjs/microservices';
import { Controller, Get, Post, Body, Inject, Query, Patch, Param } from '@nestjs/common';
import { catchError } from 'rxjs';
import { CreateImportDto } from './dto/create-import.dto';
import { NATS_SERVICE } from 'src/config';
import { FilterPaginationDto } from 'src/common/dto/filter-pagination.dto';

@Controller('imports')
export class ImportsController {

    constructor(
        @Inject(NATS_SERVICE) private readonly client: ClientProxy
    ) { }


    @Get()
    findAll(@Query() filterPaginationDto: FilterPaginationDto) {
        return this.client.send("imports.findAll", filterPaginationDto)
            .pipe(
                catchError(error => {
                    throw new RpcException(error)
                })
            )
    }

    @Get('stats')
    getStats() {
        return this.client.send("imports.stats", {})
            .pipe(
                catchError(error => { throw new RpcException(error) })
            )
    }

    @Get(':orderNumber')
    findOne(@Param('orderNumber') orderNumber: string) {
        return this.client.send("imports.findOne", orderNumber)
            .pipe(
                catchError(error => { throw new RpcException(error) })
            )
    }

    @Post()
    create(@Body() createImportDto: CreateImportDto) {
        return this.client.send("imports.create", createImportDto)
            .pipe(
                catchError(error => { throw new RpcException(error) })
            )
    }


}
