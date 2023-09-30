import { CoreEntity } from 'src/common/entities/core.entity';
import { Userr } from 'src/users/entities/user.entity';
import { Category } from './cetegory.entity';
import { Dish } from './dish.entity';
import { Order } from 'src/orders/entities/order.entity';
export declare class Restaurant extends CoreEntity {
    name: string;
    coverImg: string;
    address: string;
    category: Category;
    owner: Userr;
    ownerId: number;
    menu: Dish[];
    isPromoted: boolean;
    promotedUntil: Date;
    orders: Order[];
}
