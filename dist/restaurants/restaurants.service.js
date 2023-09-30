"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantService = void 0;
const common_1 = require("@nestjs/common");
const restaurant_entity_1 = require("./entities/restaurant.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const category_repository_1 = require("./repositories/category.repository");
const dish_entity_1 = require("./entities/dish.entity");
let RestaurantService = class RestaurantService {
    constructor(restaurants, categories, dishes) {
        this.restaurants = restaurants;
        this.categories = categories;
        this.dishes = dishes;
    }
    async getAll() {
        return await this.restaurants.find();
    }
    async createRestaurant(owner, createRestaurantInput) {
        try {
            const newRestaurant = this.restaurants.create(createRestaurantInput);
            newRestaurant.owner = owner;
            const categoryName = createRestaurantInput.categoryName.trim().toLowerCase();
            const categorySlug = categoryName.replace(/ /g, '-');
            let category = await this.categories.getOrCreate(createRestaurantInput.categoryName);
            newRestaurant.category = category;
            await this.restaurants.save(newRestaurant);
            return {
                ok: true,
                restaurantId: newRestaurant.id,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: 'Could not create restaurant',
            };
        }
    }
    async updateRestaurant(updateRestaurantDto) {
        await this.restaurants.update(updateRestaurantDto.id, Object.assign({}, updateRestaurantDto.data));
        return true;
    }
    async editRestaurant(owner, editRestaurantInput) {
        try {
            const restaurant = await this.restaurants.findOne(editRestaurantInput.restaurantId);
            if (!restaurant) {
                return {
                    ok: false,
                    error: 'Restaurant not found',
                };
            }
            if (owner.id !== restaurant.ownerId) {
                return {
                    ok: false,
                    error: "You can't edit a restaurant that you don't own",
                };
            }
            let category = null;
            if (editRestaurantInput.categoryName) {
                category = await this.categories.getOrCreate(editRestaurantInput.categoryName);
            }
            await this.restaurants.save([
                Object.assign(Object.assign({ id: editRestaurantInput.restaurantId }, editRestaurantInput), (category && { category })),
            ]);
            return {
                ok: true,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: 'Could not edit Restaurant',
            };
        }
    }
    async deleteRestaurant(owner, { restaurantId }) {
        try {
            const restaurant = await this.restaurants.findOne(restaurantId);
            if (!restaurant) {
                return {
                    ok: false,
                    error: 'Restaurant not found',
                };
            }
            if (owner.id !== restaurant.ownerId) {
                return {
                    ok: false,
                    error: "You can't delete a restaurant that you don't own",
                };
            }
            await this.restaurants.delete(restaurantId);
            return {
                ok: true,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: 'Could not delete restaurant.',
            };
        }
    }
    async allCategories() {
        try {
            const categories = await this.categories.find();
            return {
                ok: true,
                categories,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: 'Could not load categories',
            };
        }
    }
    countRestaurants(category) {
        return this.restaurants.count({ category });
    }
    async findCategoryBySlug({ slug, page }) {
        try {
            const category = await this.categories.findOne({ slug });
            if (!category) {
                return {
                    ok: false,
                    error: 'Category not found',
                };
            }
            const restaurants = await this.restaurants.find({
                where: {
                    category,
                },
                order: {
                    isPromoted: 'DESC',
                },
                take: 25,
                skip: (page - 1) * 25,
            });
            const totalResults = await this.countRestaurants(category);
            return {
                ok: true,
                restaurants,
                category,
                totalPages: Math.ceil(totalResults / 25),
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: 'Could not load category',
            };
        }
    }
    async allRestaurants({ page }) {
        try {
            const [restaurants, totalResults] = await this.restaurants.findAndCount({
                skip: (page - 1) * 3,
                take: 3,
                order: {
                    isPromoted: 'DESC',
                },
            });
            return {
                ok: true,
                results: restaurants,
                totalPages: Math.ceil(totalResults / 3),
                totalResults,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: 'Could not load restaurants',
            };
        }
    }
    async findRestaurantById({ restaurantId }) {
        try {
            const restaurant = await this.restaurants.findOne(restaurantId, {
                relations: ['menu']
            });
            if (!restaurant) {
                return {
                    ok: false,
                    error: 'Restaurant not found',
                };
            }
            return {
                ok: true,
                restaurant,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: 'Could not find restaurant',
            };
        }
    }
    async searchRestaurantByName({ query, page }) {
        try {
            const [restaurants, totalResults] = await this.restaurants.findAndCount({
                where: {
                    name: typeorm_2.Raw(name => `${name} ILIKE '%${query}%'`),
                },
                skip: (page - 1) * 25,
                take: 25,
            });
            return {
                ok: true,
                restaurants,
                totalResults,
                totalPages: Math.ceil(totalResults / 25),
            };
        }
        catch (_a) {
            return { ok: false, error: 'Could not search for restaurants' };
        }
    }
    async createDish(owner, createDishInput) {
        try {
            const restaurant = await this.restaurants.findOne(createDishInput.restaurantId);
            if (!restaurant) {
                return {
                    ok: false,
                    error: 'Restaurant not found',
                };
            }
            if (owner.id !== restaurant.ownerId) {
                return {
                    ok: false,
                    error: "You can't do that.",
                };
            }
            await this.dishes.save(this.dishes.create(Object.assign(Object.assign({}, createDishInput), { restaurant })));
            return {
                ok: true,
            };
        }
        catch (error) {
            console.log(error);
            return {
                ok: false,
                error: 'Could not create dish',
            };
        }
    }
    async checkDishOwner(ownerId, dishId) { }
    async editDish(owner, editDishInput) {
        try {
            const dish = await this.dishes.findOne(editDishInput.dishId, {
                relations: ['restaurant'],
            });
            if (!dish) {
                return {
                    ok: false,
                    error: 'Dish not found',
                };
            }
            if (dish.restaurant.ownerId !== owner.id) {
                return {
                    ok: false,
                    error: "You can't do that.",
                };
            }
            await this.dishes.save([
                Object.assign({ id: editDishInput.dishId }, editDishInput),
            ]);
            return {
                ok: true,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: 'Could not delete dish',
            };
        }
    }
    async deleteDish(owner, { dishId }) {
        try {
            const dish = await this.dishes.findOne(dishId, {
                relations: ['restaurant'],
            });
            if (!dish) {
                return {
                    ok: false,
                    error: 'Dish not found',
                };
            }
            if (dish.restaurant.ownerId !== owner.id) {
                return {
                    ok: false,
                    error: "You can't do that.",
                };
            }
            await this.dishes.delete(dishId);
            return {
                ok: true,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: 'Could not delete dish',
            };
        }
    }
};
RestaurantService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(restaurant_entity_1.Restaurant)),
    __param(2, typeorm_1.InjectRepository(dish_entity_1.Dish)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        category_repository_1.CategoryRepository,
        typeorm_2.Repository])
], RestaurantService);
exports.RestaurantService = RestaurantService;
//# sourceMappingURL=restaurants.service.js.map