import { CoreEntity } from 'src/common/entities/core.entity';
import { Userr } from './user.entity';
export declare class Verification extends CoreEntity {
    code: string;
    user: Userr;
    createCode(): void;
}
