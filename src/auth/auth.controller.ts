import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthLoginDto } from './dto/auth.login.dto';
import { AuthRegisterDto } from './dto/auth.register.dto';
import { AuthForgotPasswordDto } from './dto/auth.forgot.password.dto';
import { AuthService } from './auth.service';
import { AuthResetPasswordDto } from './dto/auth.reset.password.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { User } from 'src/decorators/user.decorator';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() { email, password }: AuthLoginDto) {
    return this.authService.login(email, password);
  }

  @Post('register')
  async register(@Body() body: AuthRegisterDto) {
    return this.authService.register(body);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  async me(@User() user) {
    return { user };
  }

  @Post('forgot-password')
  async forgotPassword(@Body() { email }: AuthForgotPasswordDto) {
    return this.authService.forgotPassword(email);
  }

  @Post('reset-password')
  async resetPassword(@Body() { password, token }: AuthResetPasswordDto) {
    return this.authService.resetPassword(password, token);
  }
}
