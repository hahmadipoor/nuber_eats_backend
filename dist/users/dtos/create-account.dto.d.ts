import { Userr } from '../entities/user.entity';
import { CoreOutput } from 'src/common/dtos/output.dto';
declare const CreateAccountInput_base: import("@nestjs/common").Type<Pick<Userr, "password" | "email" | "role">>;
export declare class CreateAccountInput extends CreateAccountInput_base {
}
export declare class CreateAccountOutput extends CoreOutput {
}
export {};
