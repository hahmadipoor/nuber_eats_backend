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
exports.Category = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const core_entity_1 = require("../../common/entities/core.entity");
const typeorm_1 = require("typeorm");
const restaurant_entity_1 = require("./restaurant.entity");
let Category = class Category extends core_entity_1.CoreEntity {
};
__decorate([
    graphql_1.Field(type => String),
    typeorm_1.Column({ unique: true }),
    class_validator_1.IsString(),
    class_validator_1.Length(5),
    __metadata("design:type", String)
], Category.prototype, "name", void 0);
__decorate([
    graphql_1.Field(type => String, { nullable: true }),
    typeorm_1.Column({ nullable: true }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Category.prototype, "coverImg", void 0);
__decorate([
    graphql_1.Field(type => String),
    typeorm_1.Column({ unique: true }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Category.prototype, "slug", void 0);
__decorate([
    graphql_1.Field(type => [restaurant_entity_1.Restaurant], { nullable: true }),
    typeorm_1.OneToMany(type => restaurant_entity_1.Restaurant, restaurant => restaurant.category),
    __metadata("design:type", Array)
], Category.prototype, "restaurants", void 0);
Category = __decorate([
    graphql_1.InputType('CategoryInputType', { isAbstract: true }),
    graphql_1.ObjectType(),
    typeorm_1.Entity()
], Category);
exports.Category = Category;
//# sourceMappingURL=cetegory.entity.js.map