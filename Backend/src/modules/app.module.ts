import { Module } from '@nestjs/common';
import { AppController } from '@//controllers/app.controller';
import { AppService } from '@//services/app.service';
import { DatabaseModule } from './db.module';
import { AuthModule } from './auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
