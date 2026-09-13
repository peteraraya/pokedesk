import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports: [
    // se utiliza para crear la conexión con la base de datos
    MongooseModule.forFeature([
      { 
        name:   Pokemon.name, 
        schema: PokemonSchema
      },
    ]),
  ],
  exports: [MongooseModule],
})
export class PokemonModule {}
