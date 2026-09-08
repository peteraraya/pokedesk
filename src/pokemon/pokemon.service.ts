import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class PokemonService {


  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) { }

  async create(createPokemonDto: CreatePokemonDto) {

    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();

    try {
      // console.log('antes de base', createPokemonDto.name, createPokemonDto.no)
      const pokemon = await this.pokemonModel.create(createPokemonDto);

      return pokemon;

    } catch (error: any) {
      this.handleException(error);
    }
    return createPokemonDto;
  }

  async findAll() {
    return this.pokemonModel.find();
  }

  async findOne(term: string) {


    let pokemon: Pokemon | null = null;

    // busca por numero
    if (!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ no: +term });
    }


    // busca por mongo id
    if (!pokemon && isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findById(term);
    }

    // Busca por nombre
    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({ name: term.toLocaleLowerCase().trim() });
    }


    if (!pokemon)
      throw new BadRequestException(`No pokemon found with name ${term}`);

    return pokemon;

  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {

    // se obtiene el objeto pokemon
    const pokemon = await this.findOne(term);
    if (updatePokemonDto.name)
      updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase();

    try {
      // se actualiza el objeto pokemon
      await pokemon.updateOne(updatePokemonDto);

      // regreso el objeto actualizado
      return { ...pokemon.toJSON(), ...updatePokemonDto };

    } catch (error: any) {
      this.handleException(error);
    }
  }

  async remove(id: string) {
    // elimina el objeto
    // const result = await this.pokemonModel.findByIdAndDelete(id);
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });
    if (deletedCount === 0)
      throw new BadRequestException(`Pokemon ${id} not found`);

    // return result;
    return;
  }


  // Esta funcion es para manejar los errores de forma centralizada
  private handleException(error: any) {
    console.log('error', error)
    if (error.code === 11000) {
      throw new BadRequestException(`Pokemon ${JSON.stringify(error.keyValue)} exists in db `);
    }
    throw new InternalServerErrorException(`Can not update pokemon ${JSON.stringify(error.keyValue)}`);
  }
}
