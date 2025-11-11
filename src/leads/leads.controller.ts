import { catchError } from 'rxjs';
import { Body, Controller, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';

import { NATS_SERVICE } from 'src/config';
import { FilterLeadsDto } from './dto/filter-leads.dto';
import { CreateLeadDto } from './dto/create-lead.dto';

@Controller('leads')
export class LeadsController {

    constructor(
        @Inject(NATS_SERVICE) private readonly client: ClientProxy
    ) { }

    @Get()
    findAll(@Query() filterLeadsDto: FilterLeadsDto) {
        return this.client.send("leads.findAll", filterLeadsDto)
            .pipe(
                catchError(error => { throw new RpcException(error) })
            );
    }

    @Post()
    create(@Body() createLeadDto: CreateLeadDto) {
        console.log(createLeadDto);
        return this.client.send("leads.create", createLeadDto)
            .pipe(
                catchError(error => { throw new RpcException(error) })
            );
    }

    @Get('seed')
    seed() {
        return this.client.send("leads.seed", {})
            .pipe(
                catchError(error => { throw new RpcException(error) })
            );
    }

    @Patch('change-status/:id')
    changeStatus(
        @Param('id') id: string,
        @Body() { status }: { status: string }
    ) {
        return this.client.send("leads.changeStatus", { id, status })
            .pipe(
                catchError(error => { console.log(error); throw new RpcException(error) })
            );
    }

    @Post('convert-to-client/:id')
    convertToClient(
        @Query('id') id: string
    ) {
        return this.client.send("leads.convertToClient", { id })
            .pipe(
                catchError(error => { throw new RpcException(error) })
            );
    }


}
