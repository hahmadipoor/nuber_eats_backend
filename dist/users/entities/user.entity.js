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
exports.Userr = exports.UserRole = void 0;
const graphql_1 = require("@nestjs/graphql");
const core_entity_1 = require("../../common/entities/core.entity");
const typeorm_1 = require("typeorm");
const bcrypt = require("bcrypt");
const typeorm_2 = require("typeorm");
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const restaurant_entity_1 = require("../../restaurants/entities/restaurant.entity");
const order_entity_1 = require("../../orders/entities/order.entity");
var UserRole;
(function (UserRole) {
    UserRole["Client"] = "Client";
    UserRole["Owner"] = "Owner";
    UserRole["Delivery"] = "Delivery";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
graphql_1.registerEnumType(UserRole, { name: "UserRole" });
let Userr = class Userr extends core_entity_1.CoreEntity {
    async hashPassword() {
        if (this.password) {
            try {
                this.password = await bcrypt.hash(this.password, 10);
            }
            catch (e) {
                console.log(e);
                throw new common_1.InternalServerErrorException();
            }
        }
    }
    async checkPassword(aPassword) {
        try {
            const ok = await bcrypt.compare(aPassword, this.password);
            return ok;
        }
        catch (e) {
            console.log(e);
            throw new common_1.InternalServerErrorException();
        }
    }
};
__decorate([
    typeorm_1.Column(),
    graphql_1.Field(type => String),
    __metadata("design:type", String)
], Userr.prototype, "email", void 0);
__decorate([
    typeorm_1.Column({ select: false }),
    typeorm_1.Column(),
    graphql_1.Field(type => String),
    __metadata("design:type", String)
], Userr.prototype, "password", void 0);
__decorate([
    typeorm_1.Column({ type: 'enum', enum: UserRole }),
    graphql_1.Field(type => UserRole),
    class_validator_1.IsEnum(UserRole),
    __metadata("design:type", String)
], Userr.prototype, "role", void 0);
__decorate([
    typeorm_1.Column({ default: false }),
    graphql_1.Field(type => Boolean),
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], Userr.prototype, "verified", void 0);
__decorate([
    graphql_1.Field(type => [restaurant_entity_1.Restaurant]),
    typeorm_1.OneToMany(type => restaurant_entity_1.Restaurant, restaurant => restaurant.owner),
    __metadata("design:type", Array)
], Userr.prototype, "restaurants", void 0);
__decorate([
    graphql_1.Field(type => [order_entity_1.Order]),
    typeorm_1.OneToMany(type => order_entity_1.Order, order => order.customer),
    __metadata("design:type", Array)
], Userr.prototype, "orders", void 0);
__decorate([
    graphql_1.Field(type => [order_entity_1.Order]),
    typeorm_1.OneToMany(type => order_entity_1.Order, order => order.driver),
    __metadata("design:type", Array)
], Userr.prototype, "rides", void 0);
__decorate([
    typeorm_2.BeforeInsert(),
    typeorm_2.BeforeUpdate(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Userr.prototype, "hashPassword", null);
Userr = __decorate([
    graphql_1.InputType('UserrInputType', { isAbstract: true }),
    graphql_1.ObjectType(),
    typeorm_1.Entity()
], Userr);
exports.Userr = Userr;
//# sourceMappingURL=user.entity.js.map