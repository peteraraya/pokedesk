import { Module } from '@nestjs/common';
import { AxiosAdapter } from './adapters/axios.adapter';

@Module({
  providers: [ AxiosAdapter ],
  exports: [ AxiosAdapter ], // se exportan los servicios que se utilizan en otros módulos
})
export class CommonModule {}
