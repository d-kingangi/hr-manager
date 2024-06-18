"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update_user_schema = exports.register_user_schema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.register_user_schema = joi_1.default.object({
    first_name: joi_1.default.string().required(),
    last_name: joi_1.default.string().required(),
    phone: joi_1.default.string().required(),
    email: joi_1.default.string().required(),
    role: joi_1.default.string().required(),
    dept_id: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
    created_at: joi_1.default.date(),
    updated_at: joi_1.default.date(),
});
exports.update_user_schema = joi_1.default.object({
    first_name: joi_1.default.string().required(),
    last_name: joi_1.default.string().required(),
    phone: joi_1.default.string().required(),
    email: joi_1.default.string().required(),
    role: joi_1.default.string().required(),
    dept_id: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
    created_at: joi_1.default.date(),
    updated_at: joi_1.default.date(),
});
