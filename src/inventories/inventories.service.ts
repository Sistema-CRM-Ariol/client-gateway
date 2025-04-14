import { Inject, Injectable } from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class InventoriesService {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) { }

  async create(createInventoryDto: CreateInventoryDto) {
    return 'This action adds a new inventory';
  }

  async findAll() {
    return `This action returns all inventories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} inventory`;
  }

  update(id: number, updateInventoryDto: UpdateInventoryDto) {
    return `This action updates a #${id} inventory`;
  }

  remove(id: number) {
    return `This action removes a #${id} inventory`;
  }
}
