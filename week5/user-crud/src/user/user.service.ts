import { BadRequestException, Injectable, Res } from "@nestjs/common";
import { User, createUserDto } from "./user.dto";
import { readFile, writeFile } from 'fs/promises';
import { randomUUID } from "crypto";
import { match } from "assert";

@Injectable()
export class UserService{
    private users=undefined;

    async readUsersFromFile(){        
        try{
            let data = await readFile('users.json');
            data=JSON.parse(data.toString());
            this.users=data;
        }
        catch(err){
            throw err;
        }

    }
    
    async writeUsersToFile(){
        try{
            let result=await writeFile('users.json',JSON.stringify(this.users))
        }
        catch(err){
            throw err;
        }
    }

    async getUsers():Promise<User[]>{
        if(!this.users)
            await this.readUsersFromFile();
        
        return this.users;
    }

    async getAUser(id:string):Promise<User>{
        if(!this.users)
            await this.readUsersFromFile();

        let matchedUser=this.users.filter((user)=>user.id===id);
        console.log(matchedUser)
        return matchedUser.length>0?matchedUser[0]:null;
    }

    async createUser(user:createUserDto){
        if(!this.users)
            await this.readUsersFromFile();

        user['id']=randomUUID();

        this.users.push(user);
        this.writeUsersToFile();

        return user;

    }

    async updateUser(id:string,user:Partial<createUserDto>){
        if(!this.users)
            await this.readUsersFromFile();

        let matchedUser=this.users.filter((user)=>user.id===id);

        if(matchedUser.length===0){
            throw new BadRequestException("User not found.");
        }

        matchedUser[0]={...matchedUser[0],...user};

        await this.writeUsersToFile();

        return matchedUser;
    }

    async deleteUser(id:string){
        if(!this.users)
            await this.readUsersFromFile();

        let updatedUsers=this.users.filter((user)=>user.id!==id);

        if(updatedUsers.length===this.users.length){
            throw new BadRequestException("User not found.");
        }

        this.users=updatedUsers;

        await this.writeUsersToFile();
    }
}