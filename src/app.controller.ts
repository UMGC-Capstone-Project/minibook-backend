import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';
import { LocalAuthGuard } from './auth/guard/local-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService
  ) { }

  @Get('/')
  getRoot() {
    return this.appService.getRoot();
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async profile(@Request() req): Promise<any> {
    return req.user;
  }

}
