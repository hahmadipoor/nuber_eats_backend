import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Userr } from "./entities/user.entity";
import { UsersService } from "./users.service";
import { CreateAccountInput, CreateAccountOutput } from "./dtos/create-account.dto";
import { LoginInput, LoginOutput } from "./dtos/login.dto";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";
import { AuthUser } from "src/auth/auth-user.decorator";
import { UserProfileInput, UserProfileOutput } from "./dtos/user-profile.dto";
import { EditProfileInput, EditProfileOutput } from "./dtos/edit-profile.dto";
import { VerifyEmailInput, VerifyEmailOutput } from "./dtos/verify-email.dto";

@Resolver(of=>Userr)
export class UsersResolver{

    constructor(private readonly usersService:UsersService){
    }

    @Mutation(returns =>CreateAccountOutput)
    async createAccount(@Args("input") createAccountInput:CreateAccountInput):Promise<CreateAccountOutput>{
        return await this.usersService.createAccount(createAccountInput);
    }

    @Mutation(returns => LoginOutput)
    async login(@Args('input') loginInput: LoginInput): Promise<LoginOutput> {
      return await this.usersService.login(loginInput);
    }

    @Query(returns => Userr)
    @UseGuards(AuthGuard)
    me(@AuthUser() authUser:Userr) {
        return authUser;     
    }

    @UseGuards(AuthGuard)
    @Query(returns => UserProfileOutput)
    async userProfile(@Args() userProfileInput:UserProfileInput):Promise<UserProfileOutput>{
        return await this.usersService.findById(userProfileInput.userId);
    }

    @Mutation(returns => EditProfileOutput)
    @UseGuards(AuthGuard)
    async editProfile(
      @AuthUser() authUser: Userr,
      @Args('input') editProfileInput: EditProfileInput)  {
      return await this.usersService.editProfile(authUser.id, editProfileInput);
    }

    @Mutation(returns => VerifyEmailOutput)
    verifyEmail( @Args('input') { code }: VerifyEmailInput): Promise<VerifyEmailOutput> {
    return this.usersService.verifyEmail(code);
  }
}

