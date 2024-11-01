import { Module } from '@nestjs/common';
import { AuthController } from '@src/controllers/auth.controller';
import { AuthService } from '@src/services/auth.service';
import { DatabaseModule } from './db.module';
import { User } from '../models/user';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    DatabaseModule,
    JwtModule.register({
      global: true,
      secret: '12345',
      signOptions: { expiresIn: '300s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
