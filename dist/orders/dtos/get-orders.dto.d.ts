import { CoreOutput } from 'src/common/dtos/output.dto';
import { Order, OrderStatus } from '../entities/order.entity';
export declare class GetOrdersInput {
    status?: OrderStatus;
}
export declare class GetOrdersOutput extends CoreOutput {
    orders?: Order[];
}
