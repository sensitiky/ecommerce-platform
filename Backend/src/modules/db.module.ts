import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '@//models/user';
import { Product } from '../models/product';
import { Cart } from '../models/cart';
import { CartItem } from '../models/cartItem';
import { Order } from '../models/order';
import { OrderItem } from '../models/orderItem';
import { Review } from '../models/review';
import { Category } from '../models/category';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST', 'localhost'),
        port: parseInt(configService.get<string>('DB_PORT', '5432'), 10),
        username: configService.get<string>('DB_USERNAME', 'postgres'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE', 'ecommerce'),
        entities: [
          User,
          Product,
          Cart,
          CartItem,
          Order,
          OrderItem,
          Product,
          Review,
          Category,
        ],
        synchronize: true,
        logging: false,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User, Product]),
  ],
  providers: [],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
