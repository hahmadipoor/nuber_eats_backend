import { CoreEntity } from 'src/common/entities/core.entity';
import { Restaurant } from './restaurant.entity';
export declare class Category extends CoreEntity {
    name: string;
    coverImg: string;
    slug: string;
    restaurants: Restaurant[];
}
