import { Module } from '@nestjs/common';
import { ProductController } from '@src/controllers/product.controller';
import { ProductService } from '@src/services/product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '@src/models/product';
import { DatabaseModule } from './db.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), DatabaseModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
