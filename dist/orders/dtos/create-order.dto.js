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
exports.CreateOrderOutput = exports.CreateOrderInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const output_dto_1 = require("../../common/dtos/output.dto");
const order_item_entity_1 = require("../entities/order-item.entity");
let CreateOrderItemInput = class CreateOrderItemInput {
};
__decorate([
    graphql_1.Field(type => graphql_1.Int),
    __metadata("design:type", Number)
], CreateOrderItemInput.prototype, "dishId", void 0);
__decorate([
    graphql_1.Field(type => [order_item_entity_1.OrderItemOption], { nullable: true }),
    __metadata("design:type", Array)
], CreateOrderItemInput.prototype, "options", void 0);
CreateOrderItemInput = __decorate([
    graphql_1.InputType()
], CreateOrderItemInput);
let CreateOrderInput = class CreateOrderInput {
};
__decorate([
    graphql_1.Field(type => graphql_1.Int),
    __metadata("design:type", Number)
], CreateOrderInput.prototype, "restaurantId", void 0);
__decorate([
    graphql_1.Field(type => [CreateOrderItemInput]),
    __metadata("design:type", Array)
], CreateOrderInput.prototype, "items", void 0);
CreateOrderInput = __decorate([
    graphql_1.InputType()
], CreateOrderInput);
exports.CreateOrderInput = CreateOrderInput;
let CreateOrderOutput = class CreateOrderOutput extends output_dto_1.CoreOutput {
};
__decorate([
    graphql_1.Field(type => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], CreateOrderOutput.prototype, "orderId", void 0);
CreateOrderOutput = __decorate([
    graphql_1.ObjectType()
], CreateOrderOutput);
exports.CreateOrderOutput = CreateOrderOutput;
//# sourceMappingURL=create-order.dto.js.map