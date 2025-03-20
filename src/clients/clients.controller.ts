import { Body, Controller, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';

import { NATS_SERVICE } from 'src/config';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { FilterPaginationDto } from 'src/common/dto/filter-pagination.dto';


@Controller("clients")
export class ClientsController {
  constructor(
    @Inject(NATS_SERVICE) private readonly clientsClient: ClientProxy
  ) { }

  @Get('seed')
  seed() {
    return this.clientsClient.send('seedClient', {});
  }

  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsClient.send('createClient', createClientDto)
      .pipe(
        catchError(error => { throw new RpcException(error) })
      );
  }

  @Get()
  findAl(@Query() filterPaginationDto: FilterPaginationDto) {
    return this.clientsClient.send('findAllClients', filterPaginationDto)
      .pipe(
        catchError(error => { 
          throw new RpcException(error) 
        })
      );
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.clientsClient.send('findOneClient', id)
      .pipe(
        catchError(error => { throw new RpcException(error) })
      )
  }

  @Patch(':id')
  udpate(@Body() updateClientDto: UpdateClientDto, @Param('id') id: string,
  ) {
    return this.clientsClient.send('updateClient', { id, updateClientDto })
      .pipe(
        catchError(error => { throw new RpcException(error) })
      );
  }
}
