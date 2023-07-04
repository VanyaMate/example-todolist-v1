import { ValidationArguments } from "class-validator/types/validation/ValidationArguments";

export const ERROR_IS_NOT_STRING = `Должен быть строкой`;
export const ERROR_IS_NOT_NUMBER = `Должен быть числом`;
export const ERROR_IS_NOT_EMPTY = `Не должен быть пустым`;
export const ERROR_IS_NOT_BOOLEAN = `Должен быть true или false`;
export const ERROR_LENGTH = (validationArguments: ValidationArguments): string => {
    const [min, max] = validationArguments.constraints;
    return `Длина должна быть от ${min} до ${max}`;
};