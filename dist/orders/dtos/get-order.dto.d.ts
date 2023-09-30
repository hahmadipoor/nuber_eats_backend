import { CoreOutput } from 'src/common/dtos/output.dto';
import { Order } from '../entities/order.entity';
declare const GetOrderInput_base: import("@nestjs/common").Type<Pick<Order, "id">>;
export declare class GetOrderInput extends GetOrderInput_base {
}
export declare class GetOrderOutput extends CoreOutput {
    order?: Order;
}
export {};
