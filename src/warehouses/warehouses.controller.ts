import { catchError } from 'rxjs';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { Controller, Get, Post, Body, Patch, Param, Inject, Query } from '@nestjs/common';

import { NATS_SERVICE } from 'src/config';
import { FilterPaginationDto } from 'src/common/dto/filter-pagination.dto';

import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';

@Controller('warehouses')
export class WarehousesController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) { }

  @Post()
  create(@Body() createWarehouseDto: CreateWarehouseDto) {
    return this.client.send("createWarehouse", createWarehouseDto)
      .pipe(
        catchError(error => { throw new RpcException(error) })
      )
  }

  @Get()
  findAll(@Query() filterPaginationDto: FilterPaginationDto) {
    return this.client.send("findAllWarehouses", filterPaginationDto)
      .pipe(
        catchError(error => {
          throw new RpcException(error)
        })
      )
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWarehouseDto: UpdateWarehouseDto) {
    return this.client.send("updateWarehouse", { id, updateWarehouseDto })
      .pipe(
        catchError(error => { throw new RpcException(error) })
      )
  }
}
