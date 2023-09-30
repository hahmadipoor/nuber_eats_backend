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
exports.OrderResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const auth_user_decorator_1 = require("../auth/auth-user.decorator");
const role_decorator_1 = require("../auth/role.decorator");
const user_entity_1 = require("../users/entities/user.entity");
const create_order_dto_1 = require("./dtos/create-order.dto");
const edit_order_dto_1 = require("./dtos/edit-order.dto");
const get_order_dto_1 = require("./dtos/get-order.dto");
const get_orders_dto_1 = require("./dtos/get-orders.dto");
const take_order_dto_1 = require("./dtos/take-order.dto");
const order_entity_1 = require("./entities/order.entity");
const orders_service_1 = require("./orders.service");
const auth_guard_1 = require("../auth/auth.guard");
let OrderResolver = class OrderResolver {
    constructor(ordersService) {
        this.ordersService = ordersService;
    }
    async createOrder(customer, createOrderInput) {
        return this.ordersService.createOrder(customer, createOrderInput);
    }
    async getOrders(userr, getOrdersInput) {
        return this.ordersService.getOrders(userr, getOrdersInput);
    }
    async getOrder(userr, getOrderInput) {
        return this.ordersService.getOrder(userr, getOrderInput);
    }
    async editOrder(userr, editOrderInput) {
        return this.ordersService.editOrder(userr, editOrderInput);
    }
    takeOrder(driver, takeOrderInput) {
        return this.ordersService.takeOrder(driver, takeOrderInput);
    }
};
__decorate([
    graphql_1.Mutation(returns => create_order_dto_1.CreateOrderOutput),
    role_decorator_1.Role(['Client']),
    common_1.UseGuards(auth_guard_1.AuthGuard),
    __param(0, auth_user_decorator_1.AuthUser()), __param(1, graphql_1.Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.Userr, create_order_dto_1.CreateOrderInput]),
    __metadata("design:returntype", Promise)
], OrderResolver.prototype, "createOrder", null);
__decorate([
    graphql_1.Query(returns => get_orders_dto_1.GetOrdersOutput),
    role_decorator_1.Role(['Any']),
    common_1.UseGuards(auth_guard_1.AuthGuard),
    __param(0, auth_user_decorator_1.AuthUser()), __param(1, graphql_1.Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.Userr, get_orders_dto_1.GetOrdersInput]),
    __metadata("design:returntype", Promise)
], OrderResolver.prototype, "getOrders", null);
__decorate([
    graphql_1.Query(returns => get_order_dto_1.GetOrderOutput),
    role_decorator_1.Role(['Any']),
    common_1.UseGuards(auth_guard_1.AuthGuard),
    __param(0, auth_user_decorator_1.AuthUser()), __param(1, graphql_1.Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.Userr, get_order_dto_1.GetOrderInput]),
    __metadata("design:returntype", Promise)
], OrderResolver.prototype, "getOrder", null);
__decorate([
    graphql_1.Mutation(returns => edit_order_dto_1.EditOrderOutput),
    role_decorator_1.Role(['Any']),
    common_1.UseGuards(auth_guard_1.AuthGuard),
    __param(0, auth_user_decorator_1.AuthUser()), __param(1, graphql_1.Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.Userr, edit_order_dto_1.EditOrderInput]),
    __metadata("design:returntype", Promise)
], OrderResolver.prototype, "editOrder", null);
__decorate([
    graphql_1.Mutation(returns => take_order_dto_1.TakeOrderOutput),
    role_decorator_1.Role(['Delivery']),
    common_1.UseGuards(auth_guard_1.AuthGuard),
    __param(0, auth_user_decorator_1.AuthUser()), __param(1, graphql_1.Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.Userr, take_order_dto_1.TakeOrderInput]),
    __metadata("design:returntype", Promise)
], OrderResolver.prototype, "takeOrder", null);
OrderResolver = __decorate([
    graphql_1.Resolver(of => order_entity_1.Order),
    __metadata("design:paramtypes", [orders_service_1.OrderService])
], OrderResolver);
exports.OrderResolver = OrderResolver;
//# sourceMappingURL=orders.resolver.js.map