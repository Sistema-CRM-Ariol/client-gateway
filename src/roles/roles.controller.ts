import { Controller, Get, Post, Body, Inject, Query } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { FilterPaginationDto } from 'src/common/dto/filter-pagination.dto';

@Controller('roles')
export class RolesController {

  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) { }

  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.client.send("createRole", createRoleDto)
      .pipe(
        catchError(error => {
          throw new RpcException(error)
        })
      )
  }

  @Get()
  findAll(@Query() filterPaginationDto: FilterPaginationDto) {
    return this.client.send("findAllRoles", filterPaginationDto)
      .pipe(
        catchError(error => { 
          throw new RpcException(error)
        })
      )

  }
}
