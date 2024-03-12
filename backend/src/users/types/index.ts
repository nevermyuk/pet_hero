import { Exclude } from "class-transformer";

export class SerializedUser {
    email: string;
    
    @Exclude()
    password: string;
}