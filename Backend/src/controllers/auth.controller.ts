import {
  Body,
  Controller,
  Post,
  Put,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from '@src/services/auth.service';
import { User } from '@src/models/user';
import { LoginDto } from '@src/dto/login.dto';
import { RegisterDto } from '@src/dto/register.dto';
import { Request } from 'express';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @UsePipes(new ValidationPipe({ transform: true }))
  async login(@Body() loginDto: LoginDto): Promise<any> {
    const { email, password } = loginDto;
    const user = await this.authService.login(email, password);
    return user;
  }

  @Post('/register')
  @UsePipes(new ValidationPipe({ transform: true }))
  async register(@Body() registerDto: RegisterDto): Promise<any> {
    await this.authService.register(registerDto);
    return {
      message: 'User registered succesfully',
    };
  }

  @UseGuards()
  @Put('/:id')
  async update(@Req() req: Request, @Body() user: User): Promise<any> {
    const userId = req.user?.id;
    await this.authService.update(userId, user);
    return {
      message: 'User updated succesfully',
    };
  }
}
