import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {};

  @Get('/')
  f1() {
    return 'FROM Auth';
  }

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  login(@Req() req) {
    return this.authService.login(req.user);
  }
}
