import { ArgsType,Field, InputType, OmitType,Int, ObjectType, PickType, } from "@nestjs/graphql";
import { IsBoolean, IsString, Length } from "class-validator";
import { Restaurant } from "../entities/restaurant.entity";
import { CoreOutput } from "src/common/dtos/output.dto";

@InputType()
export class CreateRestaurantInput extends PickType(Restaurant, ['name','coverImg','address',]) {
  @Field(type => String)
  categoryName: string;
}

@ObjectType()
export class CreateRestaurantOutput extends CoreOutput {
  @Field(type => Int)
  restaurantId?: number;
}