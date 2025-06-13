import { catchError } from 'rxjs';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Query } from '@nestjs/common';

import { NATS_SERVICE } from 'src/config';

import { UpdateProviderDto } from './dto/update-provider.dto';
import { CreateProviderDto } from './dto/create-provider.dto';
import { PaginationDto } from 'src/common';

@Controller('providers')
export class ProvidersController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) { }

  @Get('seed')
  seed() {
    return this.client.send("seedProviders", {})
      .pipe(
        catchError(error => { throw new RpcException(error) })
      )
  }

  @Post()
  create(@Body() createProviderDto: CreateProviderDto) {
    return this.client.send("createProvider", createProviderDto)
      .pipe(
        catchError(error => { throw new RpcException(error) })
      )
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.client.send("findAllProviders",paginationDto).pipe(
      catchError(error => { throw new RpcException(error) })
    )
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.client.send("findOneProvider", id)
      .pipe(
        catchError(error => { throw new RpcException(error) })
      )
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProviderDto: UpdateProviderDto) {
    return this.client.send("updateProvider", { id, updateProviderDto })
      .pipe(
        catchError(error => { throw new RpcException(error) })
      )
  }
}
