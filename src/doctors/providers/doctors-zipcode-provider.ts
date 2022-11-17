import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';

@Injectable()
export class DoctorZipCodeProvider {
  constructor(private http: HttpService) {}

  async getZipCode(zipcode: string) {
    try {
      const { data } = await this.http.axiosRef.get(
        `https://viacep.com.br/ws/${zipcode}/json/`,
      );
      return { data: data, status: data.status };
    } catch (error) {
      const err = error as AxiosError;

      const responseMessages = {
        400: 'CEP Inválido',
        500: 'Internal error server',
      };

      throw new HttpException(
        responseMessages[err.response.status],
        err.response.status,
      );
    }
  }
}
