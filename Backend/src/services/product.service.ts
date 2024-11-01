import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '@src/models/product';
import { Repository } from 'typeorm';
import { User } from '@src/models/user';
import { ProductDto } from '@src/dto/product.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async addProduct(userID: number, productDto: ProductDto): Promise<void> {
    const productExist = await this.productRepository.findOne({
      where: { name: productDto.name },
    });
    if (productExist) {
      throw new HttpException('Product already exists', HttpStatus.CONFLICT);
    }
    const user = await this.userRepository.findOne({
      where: { id: userID },
    });
    const product = await this.productRepository.create({
      ...productDto,
      user,
    });
    await this.productRepository.save(product);
  }

  async deleteProduct(userID: number, productID: number): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id: userID },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.CONFLICT);
    }
    const product = await this.productRepository.findOne({
      where: { id: productID, user: { id: userID } },
    });
    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    await this.productRepository.delete(productID);
  }

  async getProduct(productID: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id: productID },
    });
    return product;
  }
}
