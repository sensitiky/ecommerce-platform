import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@src/models/user';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from '@src/dto/register.dto';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<void> {
    const alreadyExists = await this.userRepository.findOne({
      where: { email: registerDto.email },
    });

    if (alreadyExists) {
      throw new HttpException('Email already in use', HttpStatus.CONFLICT);
    }

    const hashPassword = await bcrypt.hash(registerDto.password, 10);

    const user = this.userRepository.create({
      ...registerDto,
      password: hashPassword,
    });

    await this.userRepository.save(user);
  }

  async login(email: string, password: string): Promise<{ token: string }> {
    const user = await this.userRepository.findOne({
      where: { email },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    if (!password || !user.password) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    const userPassword = await bcrypt.compare(password, user.password);
    if (!userPassword) {
      throw new HttpException('Password mistmach', HttpStatus.UNAUTHORIZED);
    }
    const payload = { sub: user.id, username: user.username };
    return {
      token: await this.jwtService.signAsync(payload),
    };
  }

  async update(id: number, user: User): Promise<User | undefined> {
    const updatedUser = await this.userRepository.findOne({
      where: { id },
    });
    if (!updatedUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    updatedUser.username = user.username;
    updatedUser.email = user.email;
    updatedUser.password = user.password;

    await this.userRepository.save(updatedUser);

    return updatedUser;
  }
}
