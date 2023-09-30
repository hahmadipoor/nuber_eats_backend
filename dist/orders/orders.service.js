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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const dish_entity_1 = require("../restaurants/entities/dish.entity");
const restaurant_entity_1 = require("../restaurants/entities/restaurant.entity");
const user_entity_1 = require("../users/entities/user.entity");
const typeorm_2 = require("typeorm");
const order_item_entity_1 = require("./entities/order-item.entity");
const order_entity_1 = require("./entities/order.entity");
let OrderService = class OrderService {
    constructor(orders, orderItems, restaurants, dishes) {
        this.orders = orders;
        this.orderItems = orderItems;
        this.restaurants = restaurants;
        this.dishes = dishes;
    }
    async createOrder(customer, { restaurantId, items }) {
        var _a;
        try {
            const restaurant = await this.restaurants.findOne(restaurantId);
            if (!restaurant) {
                return {
                    ok: false,
                    error: 'Restaurant not found',
                };
            }
            let orderFinalPrice = 0;
            const orderItems = [];
            for (const item of items) {
                const dish = await this.dishes.findOne(item.dishId);
                if (!dish) {
                    return {
                        ok: false,
                        error: 'Dish not found.',
                    };
                }
                let dishFinalPrice = dish.price;
                for (const itemOption of item.options) {
                    const dishOption = dish.options.find(dishOption => dishOption.name === itemOption.name);
                    if (dishOption) {
                        if (dishOption.extra) {
                            dishFinalPrice = dishFinalPrice + dishOption.extra;
                        }
                        else {
                            const dishOptionChoice = (_a = dishOption.choices) === null || _a === void 0 ? void 0 : _a.find(optionChoice => optionChoice.name === itemOption.choice);
                            if (dishOptionChoice) {
                                if (dishOptionChoice.extra) {
                                    dishFinalPrice = dishFinalPrice + dishOptionChoice.extra;
                                }
                            }
                        }
                    }
                }
                orderFinalPrice = orderFinalPrice + dishFinalPrice;
                const orderItem = await this.orderItems.save(this.orderItems.create({
                    dish,
                    options: item.options,
                }));
                orderItems.push(orderItem);
            }
            const order = await this.orders.save(this.orders.create({
                customer,
                restaurant,
                total: orderFinalPrice,
                items: orderItems,
            }));
            return {
                ok: true,
                orderId: order.id,
            };
        }
        catch (e) {
            console.log(e);
            return {
                ok: false,
                error: 'Could not create order.',
            };
        }
    }
    async getOrders(userr, { status }) {
        try {
            let orders;
            if (userr.role === user_entity_1.UserRole.Client) {
                orders = await this.orders.find({
                    where: Object.assign({ customer: userr }, (status && { status })),
                });
            }
            else if (userr.role === user_entity_1.UserRole.Delivery) {
                orders = await this.orders.find({
                    where: Object.assign({ driver: userr }, (status && { status })),
                });
            }
            else if (userr.role === user_entity_1.UserRole.Owner) {
                const restaurants = await this.restaurants.find({
                    where: {
                        owner: userr,
                    },
                    relations: ['orders'],
                });
                orders = restaurants.map(restaurant => restaurant.orders).flat(1);
                if (status) {
                    orders = orders.filter(order => order.status === status);
                }
            }
            return {
                ok: true,
                orders,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: 'Could not get orders',
            };
        }
    }
    canSeeOrder(userr, order) {
        let canSee = true;
        if (userr.role === user_entity_1.UserRole.Client && order.customerId !== userr.id) {
            canSee = false;
        }
        if (userr.role === user_entity_1.UserRole.Delivery && order.driverId !== userr.id) {
            canSee = false;
        }
        if (userr.role === user_entity_1.UserRole.Owner && order.restaurant.ownerId !== userr.id) {
            canSee = false;
        }
        return canSee;
    }
    async getOrder(userr, { id: orderId }) {
        try {
            const order = await this.orders.findOne(orderId, {
                relations: ['restaurant'],
            });
            if (!order) {
                return {
                    ok: false,
                    error: 'Order not found.',
                };
            }
            if (!this.canSeeOrder(userr, order)) {
                return {
                    ok: false,
                    error: 'You cant see that',
                };
            }
            return {
                ok: true,
                order,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: 'Could not load order.',
            };
        }
    }
    async editOrder(userr, { id: orderId, status }) {
        try {
            const order = await this.orders.findOne(orderId);
            if (!order) {
                return {
                    ok: false,
                    error: 'Order not found.',
                };
            }
            if (!this.canSeeOrder(userr, order)) {
                return {
                    ok: false,
                    error: "Can't see this.",
                };
            }
            let canEdit = true;
            if (userr.role === user_entity_1.UserRole.Client) {
                canEdit = false;
            }
            if (userr.role === user_entity_1.UserRole.Owner) {
                if (status !== order_entity_1.OrderStatus.Cooking && status !== order_entity_1.OrderStatus.Cooked) {
                    canEdit = false;
                }
            }
            if (userr.role === user_entity_1.UserRole.Delivery) {
                if (status !== order_entity_1.OrderStatus.PickedUp &&
                    status !== order_entity_1.OrderStatus.Delivered) {
                    canEdit = false;
                }
            }
            if (!canEdit) {
                return {
                    ok: false,
                    error: "You can't do that.",
                };
            }
            await this.orders.save({
                id: orderId,
                status,
            });
            const newOrder = Object.assign(Object.assign({}, order), { status });
            if (userr.role === user_entity_1.UserRole.Owner) {
                if (status === order_entity_1.OrderStatus.Cooked) {
                }
            }
            return {
                ok: true,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: 'Could not edit order.',
            };
        }
    }
    async takeOrder(driver, { id: orderId }) {
        try {
            const order = await this.orders.findOne(orderId);
            if (!order) {
                return {
                    ok: false,
                    error: 'Order not found',
                };
            }
            if (order.driver) {
                return {
                    ok: false,
                    error: 'This order already has a driver',
                };
            }
            await this.orders.save({
                id: orderId,
                driver,
            });
            return {
                ok: true,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: 'Could not upate order.',
            };
        }
    }
};
OrderService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(order_entity_1.Order)),
    __param(1, typeorm_1.InjectRepository(order_item_entity_1.OrderItem)),
    __param(2, typeorm_1.InjectRepository(restaurant_entity_1.Restaurant)),
    __param(3, typeorm_1.InjectRepository(dish_entity_1.Dish)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], OrderService);
exports.OrderService = OrderService;
//# sourceMappingURL=orders.service.js.map