import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';


export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  // se utiliza para servir archivos estáticos 
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
  }),

  // se utiliza para la base de datos de MongoDB 
  MongooseModule.forRoot('mongodb://localhost:27017/nest-pokemon'),

  PokemonModule,

  CommonModule,
  ],
})
export class AppModule {}
