import { Restaurant } from "../entities/restaurant.entity";
import { CoreOutput } from "src/common/dtos/output.dto";
declare const CreateRestaurantInput_base: import("@nestjs/common").Type<Pick<Restaurant, "name" | "coverImg" | "address">>;
export declare class CreateRestaurantInput extends CreateRestaurantInput_base {
    categoryName: string;
}
export declare class CreateRestaurantOutput extends CoreOutput {
    restaurantId?: number;
}
export {};
