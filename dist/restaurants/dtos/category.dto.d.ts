import { Category } from '../entities/cetegory.entity';
import { Restaurant } from '../entities/restaurant.entity';
import { PaginationInput, PaginationOutput } from 'src/common/dtos/pagination.dto';
export declare class CategoryInput extends PaginationInput {
    slug: string;
}
export declare class CategoryOutput extends PaginationOutput {
    restaurants?: Restaurant[];
    category?: Category;
}
