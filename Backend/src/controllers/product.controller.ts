import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductService } from '@src/services/product.service';
import { ProductDto } from '@src/dto/product.dto';
import { Request } from 'express';
import { JwtAuthGuard } from '@src/guards/jwtGuard';
import { Product } from '@src/models/product';

@Controller('/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/add')
  @UsePipes(new ValidationPipe({ transform: true }))
  async addProduct(
    @Req() req: Request,
    @Body() productDto: ProductDto,
  ): Promise<any> {
    const userId = req.user.id;
    await this.productService.addProduct(userId, productDto);
    return {
      message: 'Product added succesfully',
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/delete/:id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async deleteProduct(
    @Req() req: Request,
    @Param('id') productId: number,
  ): Promise<any> {
    const userId = req.user.id;
    await this.productService.deleteProduct(userId, productId);
    return {
      message: 'Product deleted succesfully',
    };
  }

  @Get('/:id')
  async getProduct(@Param('id') productId: number): Promise<Product> {
    const product = await this.productService.getProduct(productId);
    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    return product;
  }
}
