import { Repository } from 'typeorm';
import { Category } from '../entities/cetegory.entity';
export declare class CategoryRepository extends Repository<Category> {
    getOrCreate(name: string): Promise<Category>;
}
