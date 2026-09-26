import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { envConfig } from './config/env.config';
import { JoiValidationSchema } from './config/joi.validation';


export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  // se utiliza para servir archivos estáticos 
  imports: [
    // se utiliza para cargar variables de entorno
    ConfigModule.forRoot({
      isGlobal: true, // carga la configuración de entorno global
      envFilePath: '.env', // carga la configuración de entorno
      load: [envConfig], // carga la configuración de entorno
      validationSchema: JoiValidationSchema, // valida la configuración de entorno
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),

    // se utiliza para la base de datos de MongoDB
    MongooseModule.forRootAsync({
      imports: [ConfigModule], // carga la configuración de entorno
      inject: [ConfigService], // inyecta la configuración de entorno
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URL') || '', // carga la configuración de entorno
        useNewUrlParser: true, // utiliza el parser de nuevo url
        useUnifiedTopology: true, // utiliza el topología unificada
      }),
    }),

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
