import { catchError } from 'rxjs';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { Controller, Get, Post, Body, Patch, Param, Inject, Query, UseGuards } from '@nestjs/common';

import { NATS_SERVICE } from 'src/config';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilterPaginationDto } from 'src/common/dto/filter-pagination.dto';

import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';

import { Roles } from 'src/auth/decorators/roles.decorator';
import { Public } from 'src/auth/decorators/public.decorator';
import { Permissions } from 'src/auth/decorators/permissions.decorator';

@Controller('products')
@UseGuards(AuthGuard)
export class ProductsController {

    constructor(
        @Inject(NATS_SERVICE) private readonly client: ClientProxy
    ) { }

    @Get('seed')
    @UseGuards(RolesGuard)
    @Roles('admin')
    seed() {
        return this.client.send("seedProducts", {})
            .pipe(
                catchError(error => { throw new RpcException(error) })
            );
    }

    @Post()
    @UseGuards(PermissionsGuard)
    @Permissions('products:create')
    create(@Body() createProductDto: CreateProductDto) {
        return this.client.send("createProduct", createProductDto)
            .pipe(
                catchError(error => { throw new RpcException(error) })
            );
    }

    @Get()
    @Public()
    findAll(@Query() filterPaginationDto: FilterPaginationDto) {
        return this.client.send("findAllProducts", filterPaginationDto);
    }

    @Get(':id')
    @UseGuards(PermissionsGuard)
    @Permissions('products:readOne')
    findOne(@Param('id') id: string) {
        return this.client.send("findOneProduct", id);
    }

    @Patch(':id')
    @UseGuards(PermissionsGuard)
    @Permissions('products:update')
    update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
        return this.client.send("updateProduct", { id, updateProductDto });
    }
}
