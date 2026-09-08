import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ParseMongoIdPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log({ value, metadata });

    // validar  si es un id mongo 
    if( !isValidObjectId(value) ){
      throw new BadRequestException(`Invalid mongo id ${value}`);
    }

    return value;
  }
}
