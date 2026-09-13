import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke.interface';


@Injectable()
export class SeedService {


  private readonly axios: AxiosInstance = axios;



  async exceutedSeed(){

    const { data } = await this.axios.get <PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');

    // recorremos los resultados y extraemos el numero
    data.results.forEach(({name,url}) => {
      // separamos la url
      const segments = url.split('/');
      // ahora tomo la penultima parte del array
      const no:number = +segments[segments.length-2];
      
      console.log({name,no});

    });

    return data.results;
  }

}


