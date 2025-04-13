import { Controller, Post, Body, Request, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { UserPayload } from '../../auth/jwt.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: any) {
    return this.authService.login(loginDto);
  }

  @Post('register')
  async register(@Body() registerDto: any) {
    return this.authService.register(registerDto);
  }

  @Get('init-data')
  async initData(@CurrentUser() user: UserPayload) {
    return this.authService.initData(user);
  }
} 