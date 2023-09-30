import { CoreOutput } from 'src/common/dtos/output.dto';
import { Restaurant } from '../entities/restaurant.entity';
export declare class RestaurantInput {
    restaurantId: number;
}
export declare class RestaurantOutput extends CoreOutput {
    restaurant?: Restaurant;
}
