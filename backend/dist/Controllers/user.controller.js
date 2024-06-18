"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.delete_user = exports.update_user = exports.get_single_user = exports.get_all_users = exports.register_user = void 0;
const mssql_1 = __importDefault(require("mssql"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
const sql_config_1 = require("../Config/sql.config");
const user_validator_1 = require("../Validators/user.validator");
const register_user = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_id = (0, uuid_1.v4)();
        const { first_name, last_name, phone, email, role, dept_id, password, created_at, updated_at } = req.body;
        // console.log(req.body);
        let hashed_pwd = yield bcrypt_1.default.hash(password, 4);
        let { error } = user_validator_1.register_user_schema.validate(req.body);
        if (error) {
            return res.status(400).json({
                error: error
            });
        }
        const pool = yield mssql_1.default.connect(sql_config_1.sqlConfig);
        let result = yield (yield pool.request()
            .input("user_id", mssql_1.default.VarChar, user_id)
            .input("first_name", mssql_1.default.VarChar, first_name)
            .input("last_name", mssql_1.default.VarChar, last_name)
            .input("email", mssql_1.default.VarChar, email)
            .input("phone", mssql_1.default.VarChar, phone)
            .input("role", mssql_1.default.VarChar, role)
            .input("dept_id", mssql_1.default.VarChar, dept_id)
            .input("password", mssql_1.default.VarChar, hashed_pwd)
            .input("created_at", mssql_1.default.DateTime, created_at)
            .input("updated_at", mssql_1.default.DateTime, updated_at)
            .execute('create_user')).rowsAffected;
        return res.json({
            message: "Account created successfully",
        });
    }
    catch (error) {
        return res.status(500).json({ error: error });
    }
});
exports.register_user = register_user;
const get_all_users = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield mssql_1.default.connect(sql_config_1.sqlConfig);
        let users = yield (yield pool.request().execute('get_all_users')).recordset;
        return res.status(200).json(users);
    }
    catch (error) {
        return res.status(500).json({ error: error });
    }
});
exports.get_all_users = get_all_users;
const get_single_user = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_id = req.params.user_id;
        const pool = yield mssql_1.default.connect(sql_config_1.sqlConfig);
        let user = yield (yield pool.request()
            .input("user_id", mssql_1.default.VarChar, user_id)
            .execute('get_single_user')).recordset;
        if (!user) {
            return res.status(404).json({
                error: "User not found"
            });
        }
        else {
            return res.status(200).json(user);
        }
    }
    catch (error) {
        return res.status(500).json({ error: error });
    }
});
exports.get_single_user = get_single_user;
const update_user = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_id = req.params.user_id;
        const { first_name, last_name, phone, email, role, dept_id, password, updated_at } = req.body;
        let { error } = user_validator_1.update_user_schema.validate(req.body);
        if (error) {
            return res.status(400).json({
                error: error.details[0].message
            });
        }
        const pool = yield mssql_1.default.connect(sql_config_1.sqlConfig);
        let hashed_pwd = password ? yield bcrypt_1.default.hash(password, 4) : undefined;
        let result = yield pool.request()
            .input("user_id", mssql_1.default.VarChar, user_id)
            .input("first_name", mssql_1.default.VarChar, first_name)
            .input("last_name", mssql_1.default.VarChar, last_name)
            .input("email", mssql_1.default.VarChar, email)
            .input("phone", mssql_1.default.VarChar, phone)
            .input("role", mssql_1.default.VarChar, role)
            .input("dept_id", mssql_1.default.VarChar, dept_id)
            .input("password", mssql_1.default.VarChar, hashed_pwd)
            .input("updated_at", mssql_1.default.DateTime, updated_at)
            .execute('update_user');
        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({
                error: "User not found"
            });
        }
        return res.status(200).json({
            message: "User updated successfully"
        });
    }
    catch (error) {
        return res.status(500).json({ error: error });
    }
});
exports.update_user = update_user;
const delete_user = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_id = req.params.user_id;
        const pool = yield mssql_1.default.connect(sql_config_1.sqlConfig);
        let result = yield (yield pool.request()
            .input("user_id", mssql_1.default.VarChar, user_id)
            .execute('delete_user')).rowsAffected;
        console.log(result[0]);
        if (result[0] == 0) {
            return res.status(201).json({
                error: "User not found"
            });
        }
        else {
            return res.status(200).json({
                message: "Account deleted successfully"
            });
        }
    }
    catch (error) {
        return res.json({ error });
    }
});
exports.delete_user = delete_user;
