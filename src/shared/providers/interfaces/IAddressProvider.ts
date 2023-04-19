export interface IGetAddressResponse {
  cep: string;
  state: string;
  city: string;
  street: string;
  neighborhood: string;
  errors?: string[];
}

export abstract class IAddressProvider {
  abstract getAddress(zipCode: string): Promise<IGetAddressResponse>;
}
