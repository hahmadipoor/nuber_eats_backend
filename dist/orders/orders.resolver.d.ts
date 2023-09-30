import { Userr } from 'src/users/entities/user.entity';
import { CreateOrderInput, CreateOrderOutput } from './dtos/create-order.dto';
import { EditOrderInput, EditOrderOutput } from './dtos/edit-order.dto';
import { GetOrderInput, GetOrderOutput } from './dtos/get-order.dto';
import { GetOrdersInput, GetOrdersOutput } from './dtos/get-orders.dto';
import { TakeOrderInput, TakeOrderOutput } from './dtos/take-order.dto';
import { OrderService } from './orders.service';
export declare class OrderResolver {
    private readonly ordersService;
    constructor(ordersService: OrderService);
    createOrder(customer: Userr, createOrderInput: CreateOrderInput): Promise<CreateOrderOutput>;
    getOrders(userr: Userr, getOrdersInput: GetOrdersInput): Promise<GetOrdersOutput>;
    getOrder(userr: Userr, getOrderInput: GetOrderInput): Promise<GetOrderOutput>;
    editOrder(userr: Userr, editOrderInput: EditOrderInput): Promise<EditOrderOutput>;
    takeOrder(driver: Userr, takeOrderInput: TakeOrderInput): Promise<TakeOrderOutput>;
}
