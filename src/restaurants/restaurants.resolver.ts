import { Resolver,Query,Args, Mutation, ResolveField, Parent, Int } from "@nestjs/graphql";
import { Restaurant } from './entities/restaurant.entity';
import { CreateRestaurantInput, CreateRestaurantOutput } from './dtos/create-restaurant.dto';
import { RestaurantService } from "./restaurants.service";
import { UpdateRestaurantDto } from "./dtos/update-restaurant.dto";
import { boolean } from "joi";
import { Userr } from "src/users/entities/user.entity";
import { AuthUser } from "src/auth/auth-user.decorator";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";
import { Role } from "src/auth/role.decorator";
import { EditRestaurantInput, EditRestaurantOutput } from "./dtos/edit-restaurant.dto";
import { DeleteRestaurantInput, DeleteRestaurantOutput } from "./dtos/delete-restaurant.dto";
import { Category } from "./entities/cetegory.entity";
import { AllCategoriesOutput } from "./dtos/all-categories.dto";
import { CategoryInput, CategoryOutput } from "./dtos/category.dto";
import { RestaurantsInput, RestaurantsOutput } from "./restaurants.dto";
import { RestaurantInput, RestaurantOutput } from "./dtos/restaurant.dto";
import { SearchRestaurantInput, SearchRestaurantOutput } from "./dtos/search-restaurant.dto";
import { Dish } from "./entities/dish.entity";
import { CreateDishInput, CreateDishOutput } from "./dtos/create-dish.dto";
import { EditDishInput, EditDishOutput } from "./dtos/edit-dish.dto";
import { DeleteDishInput, DeleteDishOutput } from "./dtos/delete-dish.dto";

@Resolver(of=>Restaurant)
export class RestaurantResolver{
    
    constructor(private readonly restaurantService:RestaurantService){
    }

    @Query(returns => RestaurantOutput)
    restaurant(@Args('input') restaurantInput: RestaurantInput): Promise<RestaurantOutput> {
      return this.restaurantService.findRestaurantById(restaurantInput);
    }

    @Query(returns => RestaurantsOutput)
    restaurants(@Args('input') restaurantsInput: RestaurantsInput): Promise<RestaurantsOutput> {
      return this.restaurantService.allRestaurants(restaurantsInput);
    }
    
    @Mutation(returns =>CreateRestaurantOutput)
    @UseGuards(AuthGuard)
    @Role(['Owner'])
    async createRestaurant(
        @AuthUser() authUser: Userr,
        @Args('input') createRestaurantInput:CreateRestaurantInput):Promise<CreateRestaurantOutput>{
            console.log()
            return await this.restaurantService.createRestaurant(authUser,createRestaurantInput);      
    }
    
    @Mutation(returns =>Boolean)
    async updateRestaurant(
        @Args('input') updateRestaurantDto:UpdateRestaurantDto):Promise<boolean>{
        try{
            return await this.restaurantService.updateRestaurant(updateRestaurantDto);
        }catch{
            return false;
        }
    }

    @Mutation(returns => EditRestaurantOutput)
    @Role(['Owner'])
    @UseGuards(AuthGuard)
    editRestaurant(
    @AuthUser() owner: Userr,
    @Args('input') editRestaurantInput: EditRestaurantInput,
  ): Promise<EditRestaurantOutput> {
    return this.restaurantService.editRestaurant(owner, editRestaurantInput);
    }

    @Mutation(returns => DeleteRestaurantOutput)
    @Role(['Owner'])
    @UseGuards(AuthGuard)
    deleteRestaurant(@AuthUser() owner: Userr, @Args('input') deleteRestaurantInput: DeleteRestaurantInput): Promise<DeleteRestaurantOutput> {
    return this.restaurantService.deleteRestaurant(owner,deleteRestaurantInput);
    }

    @Query(returns => SearchRestaurantOutput)
    searchRestaurant(@Args('input') searchRestaurantInput: SearchRestaurantInput): Promise<SearchRestaurantOutput> {
      return this.restaurantService.searchRestaurantByName(searchRestaurantInput);
    }  
}

@Resolver(of=>Category)
export class CategoryResolver {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Query(type => AllCategoriesOutput)
  allCategories(): Promise<AllCategoriesOutput> {
    return this.restaurantService.allCategories();
  }

  @ResolveField(type => Int)
  restaurantCount(@Parent() category: Category): Promise<number> {
    return this.restaurantService.countRestaurants(category);
  }

  @Query(type => CategoryOutput)
  category(@Args('input') categoryInput: CategoryInput): Promise<CategoryOutput> {
    return this.restaurantService.findCategoryBySlug(categoryInput);
  }
}

@Resolver(of => Dish)
export class DishResolver {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Mutation(type => CreateDishOutput)
  @UseGuards(AuthGuard)
  @Role(['Owner'])
  createDish(
    @AuthUser() owner: Userr,
    @Args('input') createDishInput: CreateDishInput,
  ): Promise<CreateDishOutput> {
    return this.restaurantService.createDish(owner, createDishInput);
  }

  @Mutation(type => EditDishOutput)
  @UseGuards(AuthGuard)
  @Role(['Owner'])
  editDish(
    @AuthUser() owner: Userr,
    @Args('input') editDishInput: EditDishInput,
  ): Promise<EditDishOutput> {
    return this.restaurantService.editDish(owner, editDishInput);
  }

  @Mutation(type => DeleteDishOutput)
  @UseGuards(AuthGuard)
  @Role(['Owner'])
  deleteDish(
    @AuthUser() owner: Userr,
    @Args('input') deleteDishInput: DeleteDishInput,
  ): Promise<DeleteDishOutput> {
    return this.restaurantService.deleteDish(owner, deleteDishInput);
  }
}

