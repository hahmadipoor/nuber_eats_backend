import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { Userr } from '../entities/user.entity';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class CreateAccountInput extends PickType(Userr, ['email','password','role']) {
}

@ObjectType()
export class CreateAccountOutput extends CoreOutput{
}