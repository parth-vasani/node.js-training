import { IsString } from "class-validator";


export class authLocalDto{
    @IsString()
    usernameField:string;

    @IsString()
    passwordField:string;
}