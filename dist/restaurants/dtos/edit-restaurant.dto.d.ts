import { CoreOutput } from 'src/common/dtos/output.dto';
import { CreateRestaurantInput } from './create-restaurant.dto';
declare const EditRestaurantInput_base: import("@nestjs/common").Type<Partial<CreateRestaurantInput>>;
export declare class EditRestaurantInput extends EditRestaurantInput_base {
    restaurantId: number;
}
export declare class EditRestaurantOutput extends CoreOutput {
}
export {};
