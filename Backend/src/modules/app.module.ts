import { Module } from '@nestjs/common';
import { AppController } from '@src/controllers/app.controller';
import { AppService } from '@src/services/app.service';
import { DatabaseModule } from './db.module';
import { AuthModule } from './auth.module';
import { ProductModule } from './product.module';

@Module({
  imports: [DatabaseModule, AuthModule, ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
