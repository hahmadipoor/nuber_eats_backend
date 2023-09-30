import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Userr } from '../entities/user.entity';

@ArgsType()
export class UserProfileInput {
  @Field(type => Number)
  userId: number;
}

@ObjectType()
export class UserProfileOutput extends CoreOutput {
  @Field(type => Userr, { nullable: true })
  user?: Userr;
}
