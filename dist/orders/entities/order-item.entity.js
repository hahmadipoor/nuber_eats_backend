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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderItem = exports.OrderItemOption = void 0;
const graphql_1 = require("@nestjs/graphql");
const core_entity_1 = require("../../common/entities/core.entity");
const dish_entity_1 = require("../../restaurants/entities/dish.entity");
const typeorm_1 = require("typeorm");
let OrderItemOption = class OrderItemOption {
};
__decorate([
    graphql_1.Field(type => String),
    __metadata("design:type", String)
], OrderItemOption.prototype, "name", void 0);
__decorate([
    graphql_1.Field(type => String, { nullable: true }),
    __metadata("design:type", String)
], OrderItemOption.prototype, "choice", void 0);
OrderItemOption = __decorate([
    graphql_1.InputType('OrderItemOptionInputType', { isAbstract: true }),
    graphql_1.ObjectType()
], OrderItemOption);
exports.OrderItemOption = OrderItemOption;
let OrderItem = class OrderItem extends core_entity_1.CoreEntity {
};
__decorate([
    graphql_1.Field(type => dish_entity_1.Dish),
    typeorm_1.ManyToOne(type => dish_entity_1.Dish, { nullable: true, onDelete: 'CASCADE' }),
    __metadata("design:type", dish_entity_1.Dish)
], OrderItem.prototype, "dish", void 0);
__decorate([
    graphql_1.Field(type => [OrderItemOption], { nullable: true }),
    typeorm_1.Column({ type: 'json', nullable: true }),
    __metadata("design:type", Array)
], OrderItem.prototype, "options", void 0);
OrderItem = __decorate([
    graphql_1.InputType('OrderItemInputType', { isAbstract: true }),
    graphql_1.ObjectType(),
    typeorm_1.Entity()
], OrderItem);
exports.OrderItem = OrderItem;
//# sourceMappingURL=order-item.entity.js.map