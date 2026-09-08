import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";



@Schema()
export class Pokemon extends Document {

  @Prop({
    required: true,
    unique: true,
  })
  name : string;

  @Prop({
    required: true,
    unique: true,
  })
  no : number;

}

// Estas son las reglas que use mongoose para validar los datos
export const PokemonSchema =  SchemaFactory.createForClass(Pokemon);