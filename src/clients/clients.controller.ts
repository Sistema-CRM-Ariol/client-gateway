import { BadRequestException, Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';
import { NATS_SERVICE } from 'src/config';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

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
    return this.clientsClient.send('createClient', createClientDto );
  }

  @Get()
  findAllClients(@Query() paginationDto: PaginationDto) {
    return this.clientsClient.send('findAllClients', paginationDto);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      const product = await firstValueFrom(
        this.clientsClient.send('find_one_client', { id })
      );

      return product;

    } catch (error) {
      throw new BadRequestException(error);
    }

  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.clientsClient.send('removeClient', id)
  }

  @Patch(':id')
  udpateProduct(@Body() updateClientDto: UpdateClientDto, @Param('id') id: string,
  ) {
    try {
      return this.clientsClient.send('updateClient', { id, updateClientDto })
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }
}
