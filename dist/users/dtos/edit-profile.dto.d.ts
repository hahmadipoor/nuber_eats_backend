import { CoreOutput } from 'src/common/dtos/output.dto';
import { Userr } from '../entities/user.entity';
export declare class EditProfileOutput extends CoreOutput {
}
declare const EditProfileInput_base: import("@nestjs/common").Type<Partial<Pick<Userr, keyof Userr>>>;
export declare class EditProfileInput extends EditProfileInput_base {
}
export {};
