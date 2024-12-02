import { BadRequestException, Body, Controller, Delete, Get, Inject, Param, ParseEnumPipe, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';
import { NATS_SERVICE } from 'src/config';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

export enum Period {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  YEARLY = 'yearly',
}

@Controller("clients")
export class ClientsController {
  constructor(
    @Inject(NATS_SERVICE) private readonly clientsClient: ClientProxy
  ) { }

  @Get('seed')
  seed() {
    return this.clientsClient.send('seedClient', {});
  }

  @Get('statistics/:period')
  getStatst(
    @Param('period', new ParseEnumPipe(Period)) period: string
  ) {
    return this.clientsClient.send('clientsStadistics', period);
  }

  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsClient.send('createClient', createClientDto)
      .pipe(
        catchError(error => { throw new RpcException(error) })
      );
  }

  @Get()
  findAllClients(@Query() paginationDto: PaginationDto) {
    return this.clientsClient.send('findAllClients', paginationDto)
      .pipe(
        catchError(error => { throw new RpcException(error) })
      );
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.clientsClient.send('findOneClient', id)
      .pipe(
        catchError(error => { throw new RpcException(error) })
      )
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.clientsClient.send('removeClient', id)
  }

  @Patch(':id')
  udpateProduct(@Body() updateClientDto: UpdateClientDto, @Param('id') id: string,
  ) {
    return this.clientsClient.send('updateClient', { id, updateClientDto })
      .pipe(
        catchError(error => { throw new RpcException(error) })
      );
  }
}
