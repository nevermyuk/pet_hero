import { zxcvbn } from '@zxcvbn-ts/core';
import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsPasswordValid(validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {

        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: {
                validate(value: any) {
                    if (!value) {
                        this.error = 'Password should not be empty';
                        return false;
                    }

                    const result = zxcvbn(value);
                    if (result.score < 4) {
                        this.error = `Password is too weak ${result.score}`;
                        return false;
                    }

                    return true;
                },
                defaultMessage(): string {
                    return this.error || 'Something went wrong';
                },
            },
        });
    };
}
