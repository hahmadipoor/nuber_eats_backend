import { CoreEntity } from 'src/common/entities/core.entity';
import { Dish } from 'src/restaurants/entities/dish.entity';
export declare class OrderItemOption {
    name: string;
    choice: String;
}
export declare class OrderItem extends CoreEntity {
    dish: Dish;
    options?: OrderItemOption[];
}
