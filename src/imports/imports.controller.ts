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
    return this.client.send("findAllImports", filterPaginationDto)
      .pipe(
        catchError(error => { throw new RpcException(error) })
      )
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.client.send("findOneImport", id)
      .pipe(
        catchError(error => { throw new RpcException(error) })
      )
  }


  @Post()
  create(@Body() createImportDto: CreateImportDto) {
    return this.client.send("createImport", createImportDto)
      .pipe(
        catchError(error => { throw new RpcException(error) })
      )
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateImportDto: any) {
    return this.client.send("updateImport", {id, updateImportDto})
      .pipe(
        catchError(error => { throw new RpcException(error) })
      )
  }

}
