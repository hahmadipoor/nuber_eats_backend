import { CreateRestaurantInput, CreateRestaurantOutput } from './dtos/create-restaurant.dto';
import { RestaurantService } from "./restaurants.service";
import { UpdateRestaurantDto } from "./dtos/update-restaurant.dto";
import { Userr } from "src/users/entities/user.entity";
import { EditRestaurantInput, EditRestaurantOutput } from "./dtos/edit-restaurant.dto";
import { DeleteRestaurantInput, DeleteRestaurantOutput } from "./dtos/delete-restaurant.dto";
import { Category } from "./entities/cetegory.entity";
import { AllCategoriesOutput } from "./dtos/all-categories.dto";
import { CategoryInput, CategoryOutput } from "./dtos/category.dto";
import { RestaurantsInput, RestaurantsOutput } from "./restaurants.dto";
import { RestaurantInput, RestaurantOutput } from "./dtos/restaurant.dto";
import { SearchRestaurantInput, SearchRestaurantOutput } from "./dtos/search-restaurant.dto";
import { CreateDishInput, CreateDishOutput } from "./dtos/create-dish.dto";
import { EditDishInput, EditDishOutput } from "./dtos/edit-dish.dto";
import { DeleteDishInput, DeleteDishOutput } from "./dtos/delete-dish.dto";
export declare class RestaurantResolver {
    private readonly restaurantService;
    constructor(restaurantService: RestaurantService);
    restaurant(restaurantInput: RestaurantInput): Promise<RestaurantOutput>;
    restaurants(restaurantsInput: RestaurantsInput): Promise<RestaurantsOutput>;
    createRestaurant(authUser: Userr, createRestaurantInput: CreateRestaurantInput): Promise<CreateRestaurantOutput>;
    updateRestaurant(updateRestaurantDto: UpdateRestaurantDto): Promise<boolean>;
    editRestaurant(owner: Userr, editRestaurantInput: EditRestaurantInput): Promise<EditRestaurantOutput>;
    deleteRestaurant(owner: Userr, deleteRestaurantInput: DeleteRestaurantInput): Promise<DeleteRestaurantOutput>;
    searchRestaurant(searchRestaurantInput: SearchRestaurantInput): Promise<SearchRestaurantOutput>;
}
export declare class CategoryResolver {
    private readonly restaurantService;
    constructor(restaurantService: RestaurantService);
    allCategories(): Promise<AllCategoriesOutput>;
    restaurantCount(category: Category): Promise<number>;
    category(categoryInput: CategoryInput): Promise<CategoryOutput>;
}
export declare class DishResolver {
    private readonly restaurantService;
    constructor(restaurantService: RestaurantService);
    createDish(owner: Userr, createDishInput: CreateDishInput): Promise<CreateDishOutput>;
    editDish(owner: Userr, editDishInput: EditDishInput): Promise<EditDishOutput>;
    deleteDish(owner: Userr, deleteDishInput: DeleteDishInput): Promise<DeleteDishOutput>;
}
