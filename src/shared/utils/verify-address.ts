import { IAddressesRepository } from '@addresses/interfaces';
import { NotFoundException } from '@nestjs/common';
import { IAddressProvider } from '@shared/providers/interfaces/IAddressProvider';

export async function verifyAddress(
  addressesRepository: IAddressesRepository,
  addressProvider: IAddressProvider,
  zipCode: string,
) {
  const addressAlreadyExists = await addressesRepository.findByZipCode(zipCode);

  if (!addressAlreadyExists) {
    const address = await addressProvider.getAddress(zipCode);

    if (address.errors?.length > 0)
      throw new NotFoundException('Zip code not found');

    const { cep, city, neighborhood, state, street } = address;

    await addressesRepository.create({
      zipCode: cep,
      city,
      neighborhood,
      state,
      street,
    });
  }
}
