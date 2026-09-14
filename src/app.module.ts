import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import { envConfig } from './config/env.config';


export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  // se utiliza para servir archivos estáticos 
  imports: [
    // se utiliza para cargar variables de entorno
    ConfigModule.forRoot({
      load: [envConfig], // carga la configuración de entorno
    }), 

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
  }),

  // se utiliza para la base de datos de MongoDB 
  MongooseModule.forRoot(process.env.MONGODB_URL || ''),

  PokemonModule,

  CommonModule,

  SeedModule,
  ],
})
export class AppModule {
  constructor() {
    console.log('AppModule constructor');
    // console.log('Process.env', process.env);
  }
}
