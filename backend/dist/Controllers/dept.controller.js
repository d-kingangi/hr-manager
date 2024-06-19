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
exports.delete_dept = exports.update_dept = exports.get_dept_employees = exports.get_single_dept = exports.get_all_depts = exports.create_dept = void 0;
const mssql_1 = __importDefault(require("mssql"));
const uuid_1 = require("uuid");
const sql_config_1 = require("../Config/sql.config");
const dept_validator_1 = require("../Validators/dept.validator");
/**
 * Creates a new department in the database.
 *
 * @param {Request} req - The request object containing the department details in the request body.
 * @param {Response} res - The response object to send the result of the operation.
 * @returns {Promise<Response>} A Promise that resolves to the response object with a success message or an error message.
 */
const create_dept = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dept_id = (0, uuid_1.v4)();
        const { name, manager_id, description } = req.body;
        let { error } = dept_validator_1.new_dept_schema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error });
        }
        const pool = yield mssql_1.default.connect(sql_config_1.sqlConfig);
        let result = yield (yield pool.request()
            .input("dept_id", mssql_1.default.VarChar, dept_id)
            .input("name", mssql_1.default.VarChar, name)
            .input("manager_id", mssql_1.default.VarChar, manager_id)
            .input("description", mssql_1.default.VarChar, description)
            .execute('create_dept')).rowsAffected;
        return res.status(201).json({
            message: "Department created successfully",
        });
    }
    catch (error) {
        return res.status(500).json({ error: error });
    }
});
exports.create_dept = create_dept;
/**
 * Retrieves all departments from the database and returns them in a JSON format.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<Response>} A promise that resolves to a JSON response containing the retrieved departments.
 * @throws {Error} If there is an error connecting to the database or retrieving the departments.
 */
const get_all_depts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield mssql_1.default.connect(sql_config_1.sqlConfig);
        let depts = yield (yield pool.request().execute('get_all_depts')).recordset;
        return res.status(200).json(depts);
    }
    catch (error) {
        return res.status(500).json({ error: error });
    }
});
exports.get_all_depts = get_all_depts;
/**
 * Retrieves a single department based on the department ID.
 *
 * @param {Request} req - The request object containing the department ID.
 * @param {Response} res - The response object to send the department information.
 * @return {Promise<Response>} A Promise that resolves to the response object with the department details or an error message.
 */
const get_single_dept = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dept_id = req.params.dept_id;
        const pool = yield mssql_1.default.connect(sql_config_1.sqlConfig);
        let dept = yield (yield pool.request()
            .input("dept_id", mssql_1.default.VarChar, dept_id)
            .execute('get_single_dept')).recordset;
        if (!dept) {
            return res.status(404).json({
                error: "Department not found"
            });
        }
        else {
            return res.status(200).json(dept);
        }
    }
    catch (error) {
        return res.status(500).json({ error: error });
    }
});
exports.get_single_dept = get_single_dept;
/**
 * Retrieves the employees of a department based on the department ID.
 *
 * @param {Request} req - The request object containing the department ID.
 * @param {Response} res - The response object to send the employee information.
 * @return {Promise<Response>} A Promise that resolves to the response object with the employee details or an error message.
 */
const get_dept_employees = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dept_id = req.params.dept_id;
        const pool = yield mssql_1.default.connect(sql_config_1.sqlConfig);
        let employees = yield (yield pool.request()
            .input("dept_id", mssql_1.default.VarChar, dept_id)
            .execute('get_dept_employees')).recordset;
        if (!employees) {
            return res.status(404).json({
                error: "Employees not found"
            });
        }
        else {
            return res.status(200).json(employees);
        }
    }
    catch (error) {
        return res.status(500).json({ error: error });
    }
});
exports.get_dept_employees = get_dept_employees;
/**
 * Updates a department in the database.
 *
 * @param {Request} req - The request object containing the department details in the request body.
 * @param {Response} res - The response object to send the result of the operation.
 * @returns {Promise<Response>} A Promise that resolves to the response object with a success message or an error message.
 */
const update_dept = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dept_id = req.params.dept_id;
        const { name, manager_id, description } = req.body;
        let { error } = dept_validator_1.update_dept_schema.validate(req.body);
        if (error) {
            return res.status(400).json({
                error: error.details[0].message
            });
        }
        const pool = yield mssql_1.default.connect(sql_config_1.sqlConfig);
        let result = yield pool.request()
            .input("dept_id", mssql_1.default.VarChar, dept_id)
            .input("name", mssql_1.default.VarChar, name)
            .input("manager_id", mssql_1.default.VarChar, manager_id)
            .input("description", mssql_1.default.VarChar, description)
            .execute('update_dept');
        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({
                error: "Department not found"
            });
        }
        return res.status(200).json({
            message: "Department updated successfully"
        });
    }
    catch (error) {
        return res.status(500).json({ error: error });
    }
});
exports.update_dept = update_dept;
/**
 * Deletes a department from the database based on the department ID.
 *
 * @param {Request} req - The request object containing the department ID.
 * @param {Response} res - The response object to send the result of the operation.
 * @returns {Promise<Response>} A Promise that resolves to the response object with a success message or an error message.
 */
const delete_dept = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dept_id = req.params.dept_id;
        const pool = yield mssql_1.default.connect(sql_config_1.sqlConfig);
        let result = yield (yield pool.request()
            .input("dept_id", mssql_1.default.VarChar, dept_id)
            .execute('delete_dept')).rowsAffected;
        if (result[0] == 0) {
            return res.status(404).json({
                error: "Department not found"
            });
        }
        else {
            return res.status(200).json({
                message: "Department deleted successfully"
            });
        }
    }
    catch (error) {
        return res.status(500).json({ error: error });
    }
});
exports.delete_dept = delete_dept;
