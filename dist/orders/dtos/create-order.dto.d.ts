import { CoreOutput } from 'src/common/dtos/output.dto';
import { OrderItemOption } from '../entities/order-item.entity';
declare class CreateOrderItemInput {
    dishId: number;
    options?: OrderItemOption[];
}
export declare class CreateOrderInput {
    restaurantId: number;
    items: CreateOrderItemInput[];
}
export declare class CreateOrderOutput extends CoreOutput {
    orderId?: number;
}
export {};
