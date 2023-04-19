import { Injectable } from '@nestjs/common';
import cep from 'cep-promise';

import {
  IAddressProvider,
  IGetAddressResponse,
} from './interfaces/IAddressProvider';

@Injectable()
export class AddressProvider implements IAddressProvider {
  async getAddress(zipCode: string): Promise<IGetAddressResponse> {
    return cep(zipCode)
      .then((response) => response)
      .catch((error) => error);
  }
}
