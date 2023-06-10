import {ArgumentMetadata, Injectable, PipeTransform} from "@nestjs/common";
import {plainToInstance} from 'class-transformer';
import {isObject, validate} from "class-validator";
import { ValidationException } from "../exceptions/class-validation.exception";

@Injectable()
export class ClassValidatorPipe implements PipeTransform<any> {
    async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
        if (!isObject(value)) return value;

        const obj = plainToInstance(metadata.metatype, value);
        const errors = await validate(obj);

        if (errors.length) {
            const messages = errors.map((error) => ({
                field: error.property,
                value: error.value,
                messages: Object.keys(error.constraints).map((key) => error.constraints[key]),
            }))
            throw new ValidationException({ errors: messages });
        }

        return value;
    }
}