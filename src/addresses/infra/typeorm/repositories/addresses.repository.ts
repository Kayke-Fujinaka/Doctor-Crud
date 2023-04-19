import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateAddressDTO } from '@addresses/dtos';
import { IAddressesRepository } from '@addresses/interfaces/IAddressesRepository';
import { Address } from '../entities/address.entity';

@Injectable()
export class AddressesRepository implements IAddressesRepository {
  constructor(
    @InjectRepository(Address)
    private repository: Repository<Address>,
  ) {}

  async create({
    zipCode,
    state,
    city,
    street,
    neighborhood,
  }: CreateAddressDTO): Promise<Address> {
    const address = this.repository.create({
      zipCode,
      state,
      city,
      street,
      neighborhood,
    });

    await this.repository.save(address);

    return address;
  }

  async findByZipCode(zipCode: string): Promise<Address> {
    return this.repository.findOne({ where: { zipCode } });
  }
}
