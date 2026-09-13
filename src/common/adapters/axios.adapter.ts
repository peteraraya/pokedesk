// Generamos un adapater para usar axios
import { Injectable } from '@nestjs/common';
import { HttpAdapter } from '../interfaces/http-adapter.interface';
import axios, { AxiosInstance } from 'axios';


@Injectable()
export class AxiosAdapter implements HttpAdapter {

  private readonly axios: AxiosInstance = axios;

  async get<T>(url: string): Promise<T> {
    try {
      // se usa axios para realizar la petición
      const { data } = await this.axios.get<T>(url);

      return data;

    } catch (error) {

      throw new Error(`Can not get ${url}`);

    }
  }
 
 
}