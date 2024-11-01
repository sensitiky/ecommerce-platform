import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../models/product';
import { User } from '../models/user';
import { CartItem } from '../models/cartItem';
import { Cart } from '../models/cart';
import { HttpException, HttpStatus } from '@nestjs/common';

export class CartService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
  ) {}
  async addItemToCart(
    cart: Cart,
    productID: number,
    quantity: number,
  ): Promise<CartItem> {
    const product = await this.productRepository.findOneBy({ id: productID });
    const item = this.cartItemRepository.create({
      product: product,
      quantity: quantity,
      cart: cart,
    });
    return await this.cartItemRepository.save(item);
  }
  async linkCartToUser(
    userID: number,
    productID: number,
    quantity: number,
  ): Promise<Cart> {
    const user = await this.userRepository.findOneBy({ id: userID });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    let cart = await this.cartRepository.findOne({
      where: { user: { id: userID } },
      relations: ['cartItems'],
    });
    if (!cart) {
      throw new HttpException('Cart not found', HttpStatus.NOT_FOUND);
    }
    const cartItem = await this.addItemToCart(cart, productID, quantity);
    cart.cartItems.push(cartItem);
    return await this.cartRepository.save(cart);
  }
}
