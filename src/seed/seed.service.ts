import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from '../pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from '../common/adapters/axios.adapter';

@Injectable()
export class SeedService {

  constructor(
    // InjectModel(Pokemon.name)
    @InjectModel(Pokemon.name)

    private readonly pokemonModel: Model<Pokemon>,

    private readonly http: AxiosAdapter, // Injectable de la interfaz HttpAdapter


  ) { }



  async exceutedSeed() {

    // borramos la base de datos
    await this.pokemonModel.deleteMany({});

    const data  = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');

    // const insertPromisesArray: any[] = [];

    const pokemonToInsert: { name: string, no: number }[] = [];

    // recorremos los resultados y extraemos el numero
    data.results.forEach(({ name, url }) => {
      // separamos la url
      const segments = url.split('/');
      // ahora tomo la penultima parte del array
      const no: number = +segments[ segments.length - 2 ];

      // y lo guardo en la base de datos
      try {

        //  const pokemon = await this.pokemonModel.create({name,no});
        // Por bloques 
        // insertPromisesArray.push(
        //   this.pokemonModel.create({name,no})
        // );
        pokemonToInsert.push({ name, no }); // [{name,no}]

      } catch (e) {
        console.log(e);
      }

    });

    // Recomendado para insertar semillas de datos
    await this.pokemonModel.insertMany(pokemonToInsert);

    // await Promise.all(insertPromisesArray);

    return 'seed executed';
  }

}


