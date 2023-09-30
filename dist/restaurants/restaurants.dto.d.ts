import { PaginationInput, PaginationOutput } from 'src/common/dtos/pagination.dto';
import { Restaurant } from './entities/restaurant.entity';
export declare class RestaurantsInput extends PaginationInput {
}
export declare class RestaurantsOutput extends PaginationOutput {
    results?: Restaurant[];
}
