import { CoreOutput } from 'src/common/dtos/output.dto';
import { Order } from '../entities/order.entity';
declare const TakeOrderInput_base: import("@nestjs/common").Type<Pick<Order, "id">>;
export declare class TakeOrderInput extends TakeOrderInput_base {
}
export declare class TakeOrderOutput extends CoreOutput {
}
export {};
