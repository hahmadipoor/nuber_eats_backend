import { CoreOutput } from 'src/common/dtos/output.dto';
import { Userr } from '../entities/user.entity';
declare const LoginInput_base: import("@nestjs/common").Type<Pick<Userr, "password" | "email">>;
export declare class LoginInput extends LoginInput_base {
}
export declare class LoginOutput extends CoreOutput {
    token?: string;
}
export {};
