import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderStatus, OrderType } from './schemas/order.schema';
import { CreateOrderDto, UpdateOrderDto } from './dto/order.dto';
import { ProductsService } from '../products/products.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    private productsService: ProductsService,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const existingOrder = await this.orderModel.findOne({ 
      orderNumber: createOrderDto.orderNumber 
    });
    
    if (existingOrder) {
      throw new ConflictException('Order with this number already exists');
    }

    // Calculate total amount if not provided
    if (!createOrderDto.totalAmount) {
      createOrderDto.totalAmount = createOrderDto.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );
    }

    const order = new this.orderModel(createOrderDto);
    return order.save();
  }

  async findAll(): Promise<Order[]> {
    return this.orderModel.find().sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.orderModel.findById(id).exec();
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  async findByType(type: OrderType): Promise<Order[]> {
    return this.orderModel.find({ type }).sort({ createdAt: -1 }).exec();
  }

  async findByStatus(status: OrderStatus): Promise<Order[]> {
    return this.orderModel.find({ status }).sort({ createdAt: -1 }).exec();
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    // Recalculate total if items are updated
    if (updateOrderDto.items && !updateOrderDto.totalAmount) {
      updateOrderDto.totalAmount = updateOrderDto.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );
    }

    const order = await this.orderModel
      .findByIdAndUpdate(id, updateOrderDto, { new: true })
      .exec();

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }

  async remove(id: string): Promise<void> {
    const result = await this.orderModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Order not found');
    }
  }

  async processOrder(id: string, processedBy: string): Promise<Order> {
    const order = await this.orderModel.findById(id).exec();
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    // Update product stock based on order type
    for (const item of order.items) {
      const stockChange = order.type === OrderType.INBOUND 
        ? item.quantity 
        : -item.quantity;
      
      await this.productsService.updateStock(item.productId, stockChange);
    }

    order.status = OrderStatus.COMPLETED;
    order.processedBy = processedBy;
    return order.save();
  }
}
