import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Query } from '@nestjs/common';
import { CreateExportDto } from './dto/create-export.dto';
import { UpdateExportDto } from './dto/update-export.dto';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { FilterPaginationDto } from 'src/common/dto/filter-pagination.dto';
import { InventoriesGateway } from 'src/inventories/inventories.gateway';

@Controller('exports')
export class ExportsController {

  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy,
  ) { }


  @Post()
  create(@Body() createExportDto: CreateExportDto) {
    return this.client.send("createExport", createExportDto)
      .pipe(
        catchError(error => { throw new RpcException(error) })
      )
  }

  @Get()
  findAll(@Query() filterPaginationDto: FilterPaginationDto) {
    return this.client.send("findAllExports", filterPaginationDto)
      .pipe(
        catchError(error => { throw new RpcException(error) })
      )
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.client.send("findOneExport", id)
      .pipe(
        catchError(error => { throw new RpcException(error) })
      )
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.exportsService.findOne(+id);
  // }

}
