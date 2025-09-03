import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Query } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError} from 'rxjs';
import { FilterPaginationDto } from 'src/common/dto/filter-pagination.dto';

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
  findAll(@Query() filterPaginationDto: FilterPaginationDto) {
    return this.client.send('findAllBrands', filterPaginationDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto) {
    return this.client.send('updateBrand', { id, updateBrandDto });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.client.send('removeBrand', id);
  }

  @Get('seed')
  seed() {
    return this.client.send('seedBrands', {});
  }
}
