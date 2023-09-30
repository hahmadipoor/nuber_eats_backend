import { CoreEntity } from 'src/common/entities/core.entity';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { Userr } from 'src/users/entities/user.entity';
import { OrderItem } from './order-item.entity';
export declare enum OrderStatus {
    Pending = "Pending",
    Cooking = "Cooking",
    Cooked = "Cooked",
    PickedUp = "PickedUp",
    Delivered = "Delivered"
}
export declare class Order extends CoreEntity {
    customer?: Userr;
    customerId: number;
    restaurant?: Restaurant;
    items: OrderItem[];
    total?: number;
    status: OrderStatus;
    driver?: Userr;
    driverId: number;
}
