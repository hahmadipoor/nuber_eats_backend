"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const dish_entity_1 = require("../restaurants/entities/dish.entity");
const restaurant_entity_1 = require("../restaurants/entities/restaurant.entity");
const order_item_entity_1 = require("./entities/order-item.entity");
const order_entity_1 = require("./entities/order.entity");
const orders_resolver_1 = require("./orders.resolver");
const orders_service_1 = require("./orders.service");
let OrdersModule = class OrdersModule {
};
OrdersModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([order_entity_1.Order, restaurant_entity_1.Restaurant, order_item_entity_1.OrderItem, dish_entity_1.Dish])],
        providers: [orders_service_1.OrderService, orders_resolver_1.OrderResolver],
    })
], OrdersModule);
exports.OrdersModule = OrdersModule;
//# sourceMappingURL=orders.module.js.map