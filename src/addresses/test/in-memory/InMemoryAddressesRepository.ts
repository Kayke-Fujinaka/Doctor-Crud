import { CreateAddressDTO } from '@addresses/dtos';
import { Address } from '@addresses/infra/typeorm/entities/address.entity';
import { IAddressesRepository } from '@addresses/interfaces';

export class InMemoryAddressesRepository implements IAddressesRepository {
  addresses: Address[] = [];

  async findByZipCode(zipCode: string): Promise<Address> {
    return this.addresses.find((address) => address.zipCode === zipCode);
  }

  async create(data: CreateAddressDTO): Promise<Address> {
    const address = new Address();

    Object.assign(address, data);

    this.addresses.push(address);

    return address;
  }
}
