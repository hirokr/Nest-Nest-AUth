import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/user.dto';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';
import { RefreshAuthGuard } from './guards/refresh-auth/refresh-auth.guard';
import { GoogleAuthGuard } from './guards/google-auth/google-auth.guard';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async registerUser(@Body() createUserDto: CreateUserDto) {
    return await this.authService.registerUser(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async login(@Request() req) {
    return this.authService.login(req.user.id, req.user.name);
  }

  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getAll(@Request() req) {
    return this.authService.refreshToken(req.user.id, req.user.name);
  }

  @UseGuards(RefreshAuthGuard)
  @Post('refresh')
  refreshToken(@Request() req) {
    const userId = req.user.id;
    return this.authService.login(userId, req.user.name);
  }

  @Post('signout')
  signOut(@Request() req) {
    return this.authService.signOut(req.user.id);
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  googleLogin() {
    // initiates the Google OAuth2 login flow
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  async googleCallback(@Request() req, @Res() res: Response) {
    // handles the Google OAuth2 callback and redirects or responds with user info

    const response = await this.authService.login(req.user.id, req.user.name);
    res.redirect(
      `http://localhost:3000/api/auth/google/callback?userId=${response.id}&accessToken=${response.accessToken}&refreshToken=${response.refreshToken}&name=${req.user.name}`,
    );
  }
}
