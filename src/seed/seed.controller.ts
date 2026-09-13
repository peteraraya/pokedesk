import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SeedService } from './seed.service';


@Controller('seed')
export class SeedController {

  constructor(private readonly seedService: SeedService) {}

  @Get()
  exceuteSeed(){
    return this.seedService.exceutedSeed();
  }
}


/**
 * escuchar solicitudes y regresarlas a la misma ruta
 * no deberia realizar casi nada de logica
 */