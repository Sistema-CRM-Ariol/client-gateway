import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';

@Controller('providers')
export class ProvidersController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) { }

  @Post()
  create(@Body() createProviderDto: CreateProviderDto) {
    return this.client.send("createProvider", createProviderDto)
      .pipe( 
        catchError( error => { throw new RpcException(error) })
      )    
  }

  @Get()
  findAll() {
    return this.client.send("findAllProviders", {});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.client.send("findOneProvider",+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProviderDto: UpdateProviderDto) {
    return this.client.send("updateProvider",{ id: +id, updateProviderDto});
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.client.send("removeProvider", +id);
  }
}
