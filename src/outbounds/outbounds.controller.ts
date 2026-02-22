import { catchError } from 'rxjs';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { Controller, Get, Query, Inject, Post, Body, Patch } from '@nestjs/common';

import { NATS_SERVICE } from 'src/config';
import { FilterPaginationDto } from 'src/common/dto/filter-pagination.dto';

import { CreateOutboundDto } from './dto/create-outbound.dto';
import { OutboundOrderStatus } from './types/outbound-order-status.type';

@Controller('outbounds')
export class OutboundsController {
    constructor(
        @Inject(NATS_SERVICE) private readonly client: ClientProxy
    ) { }


    // ─── Stats ──────────────────────────────────────────────────────

    @Get('sales/stats')
    getSalesStats() {
        return this.client.send("outbounds.sales.stats", {})
            .pipe(
                catchError(error => { throw new RpcException(error) })
            )
    }

    @Get('quotations/stats')
    getQuotationsStats() {
        return this.client.send("outbounds.quotations.stats", {})
            .pipe(
                catchError(error => { throw new RpcException(error) })
            )
    }

    // ─── Ventas ─────────────────────────────────────────────────────

    @Get('sales')
    findAll(@Query() filterPaginationDto: FilterPaginationDto) {
        return this.client.send("outbounds.sales.findAll", filterPaginationDto)
            .pipe(
                catchError(error => {
                    throw new RpcException(error)
                })
            )
    }

    @Post('sales')
    createSale(@Body() createOutboundDto: CreateOutboundDto) {
        return this.client.send("outbounds.sales.create", createOutboundDto).pipe(
            catchError(error => {
                throw new RpcException(error)
            })
        )
    }

    // ─── Cotizaciones ─────────────────────────────────────────────────────
    @Post('quotations')
    createQuotation(@Body() createOutboundDto: CreateOutboundDto) {
        return this.client.send("outbounds.quotations.create", createOutboundDto).pipe(
            catchError(error => {
                throw new RpcException(error)
            })
        )
    }

    @Get('quotations')
    findAllQuotations(@Query() filterPaginationDto: FilterPaginationDto) {
        return this.client.send("outbounds.quotations.findAll", filterPaginationDto)
            .pipe(
                catchError(error => {
                    throw new RpcException(error)
                })
            )
    }

    @Post('quotations/convert')
    convertQuotationToSale(@Body('orderNumber') orderNumber: string) {
        return this.client.send("outbounds.quotations.convertToSale", orderNumber).pipe(
            catchError(error => {
                throw new RpcException(error)
            })
        )
    }

    // ─── Comunes ─────────────────────────────────────────────────────
    
    @Get(':orderNumber')
    findOne(@Query('orderNumber') orderNumber: string) {
        return this.client.send("outbounds.findOne", orderNumber).pipe(
            catchError(error => {
                throw new RpcException(error)
            })
        )
    }

    @Patch('change-status')
    changeStatus(@Body() payload: { orderNumber: string; status: OutboundOrderStatus }) {
        return this.client.send("outbounds.changeStatus", payload).pipe(
            catchError(error => {
                throw new RpcException(error)
            })
        )
    }

}
