"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditOrderOutput = exports.EditOrderInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const output_dto_1 = require("../../common/dtos/output.dto");
const order_entity_1 = require("../entities/order.entity");
let EditOrderInput = class EditOrderInput extends graphql_1.PickType(order_entity_1.Order, ['id', 'status']) {
};
EditOrderInput = __decorate([
    graphql_1.InputType()
], EditOrderInput);
exports.EditOrderInput = EditOrderInput;
let EditOrderOutput = class EditOrderOutput extends output_dto_1.CoreOutput {
};
EditOrderOutput = __decorate([
    graphql_1.ObjectType()
], EditOrderOutput);
exports.EditOrderOutput = EditOrderOutput;
//# sourceMappingURL=edit-order.dto.js.map