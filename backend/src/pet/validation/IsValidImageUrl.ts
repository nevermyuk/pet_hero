import axios from 'axios';
import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

export function IsValidImageUrl(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isValidImageUrl',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: {
                async validate(value: any, args: ValidationArguments) {
                    return typeof value === 'string' && await axios.head(value).then(res => res.headers['content-type'].startsWith('image'))
                },
            },
        });
    };
}