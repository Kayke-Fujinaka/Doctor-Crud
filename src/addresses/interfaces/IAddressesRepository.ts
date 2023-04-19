import { CreateAddressDTO } from 'addresses/dtos';
import { Address } from 'addresses/infra/typeorm/entities/address.entity';

export abstract class IAddressesRepository {
  abstract create(data: CreateAddressDTO): Promise<Address>;

  abstract findByZipCode(zipCode: string): Promise<Address>;
}
