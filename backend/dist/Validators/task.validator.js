"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update_task_schema = exports.new_task_schema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.new_task_schema = joi_1.default.object({
    title: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    due_date: joi_1.default.date().required(),
    status: joi_1.default.string().required,
    assigned_to: joi_1.default.string(),
    created_at: joi_1.default.date().required,
    estimated_effort: joi_1.default.number(),
    completed_at: joi_1.default.string(),
    labels: joi_1.default.string()
});
exports.update_task_schema = joi_1.default.object({
    title: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    due_date: joi_1.default.date().required(),
    status: joi_1.default.string().required,
    assigned_to: joi_1.default.string(),
    created_at: joi_1.default.date().required,
    estimated_effort: joi_1.default.number(),
    completed_at: joi_1.default.string(),
    labels: joi_1.default.string()
});
