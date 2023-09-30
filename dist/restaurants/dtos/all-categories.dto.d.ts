import { CoreOutput } from 'src/common/dtos/output.dto';
import { Category } from '../entities/cetegory.entity';
export declare class AllCategoriesOutput extends CoreOutput {
    categories?: Category[];
}
