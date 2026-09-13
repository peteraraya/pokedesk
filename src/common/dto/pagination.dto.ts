import { IsNumber, IsOptional, IsPositive, Min } from "class-validator";


export class PaginationDto {

  @IsOptional() // si no se especifica, se devuelve todos los datos
  @IsPositive() // se debe especificar un numero positivo
  @IsNumber() // se debe especificar un numero
  @Min(1) // se debe especificar un numero mayor que 0
  limit?: number;

  @IsOptional() // si no se especifica, se devuelve todos los datos
  @IsPositive() // se debe especificar un numero positivo
  @Min(0) // se debe especificar un numero mayor que 0
  offset?: number; 
}