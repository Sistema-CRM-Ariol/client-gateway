import { Controller, Get, Post, Body, Query, Param, Delete, Patch } from '@nestjs/common';
import { InventoriesService } from './inventories.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { WarehouseFilterPaginatedDto } from './dto/warehouse-filter-paginated.dto';

@Controller('inventories')
export class InventoriesController {
  constructor(private readonly inventoriesService: InventoriesService) { }

  @Get()
  findAll(@Query() query: WarehouseFilterPaginatedDto) {
    return this.inventoriesService.findAll(query);
  }

  @Post()
  create(@Body() createInventoryDto: CreateInventoryDto) {
    return this.inventoriesService.create(createInventoryDto)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInventoryDto: UpdateInventoryDto) {
    return this.inventoriesService.update(id, updateInventoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.inventoriesService.remove(+id);
  }
}
