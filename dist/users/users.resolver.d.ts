import { Userr } from "./entities/user.entity";
import { UsersService } from "./users.service";
import { CreateAccountInput, CreateAccountOutput } from "./dtos/create-account.dto";
import { LoginInput, LoginOutput } from "./dtos/login.dto";
import { UserProfileInput, UserProfileOutput } from "./dtos/user-profile.dto";
import { EditProfileInput, EditProfileOutput } from "./dtos/edit-profile.dto";
import { VerifyEmailInput, VerifyEmailOutput } from "./dtos/verify-email.dto";
export declare class UsersResolver {
    private readonly usersService;
    constructor(usersService: UsersService);
    createAccount(createAccountInput: CreateAccountInput): Promise<CreateAccountOutput>;
    login(loginInput: LoginInput): Promise<LoginOutput>;
    me(authUser: Userr): Userr;
    userProfile(userProfileInput: UserProfileInput): Promise<UserProfileOutput>;
    editProfile(authUser: Userr, editProfileInput: EditProfileInput): Promise<EditProfileOutput>;
    verifyEmail({ code }: VerifyEmailInput): Promise<VerifyEmailOutput>;
}
