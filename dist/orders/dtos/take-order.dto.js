"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TakeOrderOutput = exports.TakeOrderInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const output_dto_1 = require("../../common/dtos/output.dto");
const order_entity_1 = require("../entities/order.entity");
let TakeOrderInput = class TakeOrderInput extends graphql_1.PickType(order_entity_1.Order, ['id']) {
};
TakeOrderInput = __decorate([
    graphql_1.InputType()
], TakeOrderInput);
exports.TakeOrderInput = TakeOrderInput;
let TakeOrderOutput = class TakeOrderOutput extends output_dto_1.CoreOutput {
};
TakeOrderOutput = __decorate([
    graphql_1.ObjectType()
], TakeOrderOutput);
exports.TakeOrderOutput = TakeOrderOutput;
//# sourceMappingURL=take-order.dto.js.map