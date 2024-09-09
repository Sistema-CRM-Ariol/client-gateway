import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Query, BadRequestException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PaginationDto } from 'src/common';
import { catchError, firstValueFrom } from 'rxjs';

@Controller('brands')
export class BrandsController {

  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) { }

  @Post()
  async create(@Body() createBrandDto: CreateBrandDto) {
    return this.client.send('createBrand', createBrandDto)
      .pipe( 
        catchError( error => { throw new RpcException(error) })
      )      
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.client.send('findAllBrands', paginationDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto) {
    return this.client.send('updateBrand', { id, updateBrandDto });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.client.send('removeBrand', id);
  }
}
