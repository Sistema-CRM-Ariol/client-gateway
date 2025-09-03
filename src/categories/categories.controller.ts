import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Query } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { FilterPaginationDto } from 'src/common/dto/filter-pagination.dto';

@Controller('categories')
export class CategoriesController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) { }

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.client.send('createCategory', createCategoryDto)
      .pipe(
        catchError(error => { throw new RpcException(error) })
      )
  }

  @Get()
  findAll(@Query() filterPaginationDto: FilterPaginationDto) {
    return this.client.send('findAllCategories', filterPaginationDto)
      .pipe(
        catchError(error => { throw new RpcException(error) })
      )
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.client.send('updateCategory', { id, updateCategoryDto })
      .pipe(
        catchError(error => { throw new RpcException(error) })
      );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.client.send('removeCategory', id)
      .pipe(
        catchError(error => { throw new RpcException(error) })
      );
  }

  @Get('seed')
  seed() {
    return this.client.send('seedCategories', {});
  }
}
