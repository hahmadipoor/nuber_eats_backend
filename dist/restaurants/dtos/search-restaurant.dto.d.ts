import { PaginationInput, PaginationOutput } from 'src/common/dtos/pagination.dto';
import { Restaurant } from '../entities/restaurant.entity';
export declare class SearchRestaurantInput extends PaginationInput {
    query: string;
}
export declare class SearchRestaurantOutput extends PaginationOutput {
    restaurants?: Restaurant[];
}
