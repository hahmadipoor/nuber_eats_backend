import { CoreOutput } from 'src/common/dtos/output.dto';
import { Order } from '../entities/order.entity';
declare const EditOrderInput_base: import("@nestjs/common").Type<Pick<Order, "id" | "status">>;
export declare class EditOrderInput extends EditOrderInput_base {
}
export declare class EditOrderOutput extends CoreOutput {
}
export {};
