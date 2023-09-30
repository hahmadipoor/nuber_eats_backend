import { Dish } from 'src/restaurants/entities/dish.entity';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { Userr } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateOrderInput, CreateOrderOutput } from './dtos/create-order.dto';
import { EditOrderInput, EditOrderOutput } from './dtos/edit-order.dto';
import { GetOrderInput, GetOrderOutput } from './dtos/get-order.dto';
import { GetOrdersInput, GetOrdersOutput } from './dtos/get-orders.dto';
import { TakeOrderInput, TakeOrderOutput } from './dtos/take-order.dto';
import { OrderItem } from './entities/order-item.entity';
import { Order } from './entities/order.entity';
export declare class OrderService {
    private readonly orders;
    private readonly orderItems;
    private readonly restaurants;
    private readonly dishes;
    constructor(orders: Repository<Order>, orderItems: Repository<OrderItem>, restaurants: Repository<Restaurant>, dishes: Repository<Dish>);
    createOrder(customer: Userr, { restaurantId, items }: CreateOrderInput): Promise<CreateOrderOutput>;
    getOrders(userr: Userr, { status }: GetOrdersInput): Promise<GetOrdersOutput>;
    canSeeOrder(userr: Userr, order: Order): boolean;
    getOrder(userr: Userr, { id: orderId }: GetOrderInput): Promise<GetOrderOutput>;
    editOrder(userr: Userr, { id: orderId, status }: EditOrderInput): Promise<EditOrderOutput>;
    takeOrder(driver: Userr, { id: orderId }: TakeOrderInput): Promise<TakeOrderOutput>;
}
