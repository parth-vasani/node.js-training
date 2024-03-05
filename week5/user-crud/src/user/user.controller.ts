import { BadGatewayException, BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { User, createUserDto } from "./user.dto";
import { response } from "express";
import { AuthGuard } from "@nestjs/passport";
import { JwtService } from "@nestjs/jwt";
import { AuthService } from "src/auth/auth.service";


@Controller('users')
export class UserController{
    constructor(private readonly userService:UserService){};

    @UseGuards(AuthGuard('jwt'))
    @Get('/')
    async getUsers(){
        let users = await this.userService.getUsers();

        return {data:users}
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/:id')
    async getAUser(@Param('id') id:string){
       let user=await this.userService.getAUser(id);

       if(!user){
        throw new BadRequestException("User not found.");
       }

       return {status:200,data:user};
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('/')
    async createUser(@Body() user:createUserDto){
        await this.userService.createUser(user);

        return {status:201,msg:"User created."}
    }

    @UseGuards(AuthGuard('jwt'))
    @Put('/:id')
    async updateUser(@Param('id') id:string,@Body() userData:Partial<User>){
        await this.userService.updateUser(id,userData)

        return {status:200,msg:"User updated."}
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete('/:id')
    async deleteUser(@Param('id') id:string){
        await this.userService.deleteUser(id);

        return {status:200,msg:"User deleted."};
    }

    
    // @UseGuards(AuthGuard('local'))
    // @Post('/login')
    // login(@Req() req){
    //     console.log(req.user)
    //     return this.authService.login(req.user);
    // }

};