import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Query } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { PaginationDto } from 'src/common';

@Controller('companies')
export class CompaniesController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) { }

  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.client.send('createCompany', createCompanyDto)
      .pipe(
        catchError(error => { throw new RpcException(error) })
      );
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.client.send('findAllCompanies', paginationDto)
      .pipe(
        catchError(error => { throw new RpcException(error) })
      );
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.client.send('updateCompany', { id, updateCompanyDto })
      .pipe(
        catchError(error => { throw new RpcException(error) })
      );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.client.send('removeCompany', id)
      .pipe(
        catchError(error => { throw new RpcException(error) })
      );
  }

  @Get('seed')
  seed() {
    return this.client.send('seedCompany', {});
  }
}
