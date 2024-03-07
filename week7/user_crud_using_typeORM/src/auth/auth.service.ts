import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(userId: string, password: string): Promise<any> {
    const user = await this.usersService.getAUser(userId);
    console.log('USER', user);

    if(!user){
      throw new UnauthorizedException("User does not exist.");
    }
    if(user.password!==password){
      throw new UnauthorizedException("Password does not match.")
    }
    
    const { password:pass, ...result } = user;
    return result;
    
  }

  async login(user) {
    const payload = { sub: user.id, username: user.username };
    return { access_token: this.jwtService.sign(payload) };
  }
}
