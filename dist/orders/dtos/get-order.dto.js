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
exports.GetOrderOutput = exports.GetOrderInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const output_dto_1 = require("../../common/dtos/output.dto");
const order_entity_1 = require("../entities/order.entity");
let GetOrderInput = class GetOrderInput extends graphql_1.PickType(order_entity_1.Order, ['id']) {
};
GetOrderInput = __decorate([
    graphql_1.InputType()
], GetOrderInput);
exports.GetOrderInput = GetOrderInput;
let GetOrderOutput = class GetOrderOutput extends output_dto_1.CoreOutput {
};
__decorate([
    graphql_1.Field(type => order_entity_1.Order, { nullable: true }),
    __metadata("design:type", order_entity_1.Order)
], GetOrderOutput.prototype, "order", void 0);
GetOrderOutput = __decorate([
    graphql_1.ObjectType()
], GetOrderOutput);
exports.GetOrderOutput = GetOrderOutput;
//# sourceMappingURL=get-order.dto.js.map