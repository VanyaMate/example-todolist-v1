import { ValidationArguments } from "class-validator/types/validation/ValidationArguments";

export const ERROR_IS_STRING = `Должен быть строкой`;
export const ERROR_LENGTH = (validationArguments: ValidationArguments): string => {
    const [min, max] = validationArguments.constraints;
    return `Длина должна быть от ${min} до ${max}`;
};