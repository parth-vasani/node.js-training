import { BadRequestException, Injectable, Res } from "@nestjs/common";
import {  UserDto, createUserDto } from "./user.dto";
import { readFile, writeFile } from 'fs/promises';
import { privateDecrypt, randomUUID } from "crypto";
import { match } from "assert";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";

@Injectable()
export class UserService{
    constructor(@InjectRepository(User) private userRepository:Repository<User>) {};

    async getUsers():Promise<UserDto[]>{
        return await this.userRepository.find();
    }

    async getAUser(id:string):Promise<UserDto>{
        return await this.userRepository.findOneBy({id})
    }

    async createUser(user:createUserDto){
        let u = this.userRepository.create(user);
        return await this.userRepository.save(u);

    }

    async updateUser(id:string,user:Partial<createUserDto>){
        return await this.userRepository.update({id:id},user);
    }

    async deleteUser(id:string){
        return await this.userRepository.delete({id});
    }
}