import { Controller, Get, Post, Body, Patch, Param, Inject, Query } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { FilterPaginationDto } from 'src/common/dto/filter-pagination.dto';

@Controller('products')
export class ProductsController {

  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) { }

  @Get('seed')
  seed() {
    return this.client.send("seedProducts", {})
      .pipe(
        catchError(error => { throw new RpcException(error) })
      );
  }

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.client.send("createProduct", createProductDto)
      .pipe(
        catchError(error => { throw new RpcException(error) })
      );
  }

  @Get()
  findAll(@Query() filterPaginationDto: FilterPaginationDto) {
    return this.client.send("findAllProducts", filterPaginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.client.send("findOneProduct", id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.client.send("updateProduct", { id, updateProductDto });
  }
}
