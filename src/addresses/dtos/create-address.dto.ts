import { IsNotEmpty, IsNumberString, IsString, Length } from 'class-validator';

export class CreateAddressDTO {
  @IsNumberString()
  @IsNotEmpty()
  @Length(8, 8)
  zipCode: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  street: string;

  @IsString()
  @IsNotEmpty()
  neighborhood: string;
}
