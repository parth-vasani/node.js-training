import { IsEmail, IsNumber, IsString, isString } from "class-validator";

export class UserDto{
    id:string;
    username:string;
    password:string;
    email:string;
    age:number;
}

export class createUserDto{
    @IsString()
    username:string;

    @IsEmail()
    email:string;

    @IsString()
    password:string;

    @IsNumber()
    age:number;
} 