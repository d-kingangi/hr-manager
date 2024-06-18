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
exports.delete_task = exports.update_task = exports.get_manager_tasks = exports.get_employee_tasks = exports.get_dept_tasks = exports.get_single_task = exports.get_all_tasks = exports.create_task = void 0;
const mssql_1 = __importDefault(require("mssql"));
const uuid_1 = require("uuid");
const sql_config_1 = require("../Config/sql.config");
const task_validator_1 = require("../Validators/task.validator");
const create_task = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task_id = (0, uuid_1.v4)();
        const { title, description, due_date, status, assigned_to, created_by, estimated_effort, labels } = req.body;
        let { error } = task_validator_1.new_task_schema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error });
        }
        const pool = yield mssql_1.default.connect(sql_config_1.sqlConfig);
        let result = yield (yield pool.request()
            .input("task_id", mssql_1.default.VarChar, task_id)
            .input("title", mssql_1.default.VarChar, title)
            .input("description", mssql_1.default.VarChar, description)
            .input("due_date", mssql_1.default.VarChar, due_date)
            .input("status", mssql_1.default.VarChar, status)
            .input("assigned_to", mssql_1.default.VarChar, assigned_to)
            .input("created_by", mssql_1.default.VarChar, created_by)
            .input("estimated_effort", mssql_1.default.Int, estimated_effort)
            .input("labels", mssql_1.default.VarChar, labels)
            .execute('create_task')).rowsAffected;
        return res.status(201).json({
            message: "Task created successfully",
        });
    }
    catch (error) {
        return res.status(500).json({ error: error });
    }
});
exports.create_task = create_task;
const get_all_tasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield mssql_1.default.connect(sql_config_1.sqlConfig);
        let tasks = yield (yield pool.request().execute('get_all_tasks')).recordset;
        if (!tasks) {
            return res.status(404).json({
                error: "Tasks not found"
            });
        }
        else {
            return res.status(200).json(tasks);
        }
    }
    catch (error) {
        return res.status(500).json({ error: error });
    }
});
exports.get_all_tasks = get_all_tasks;
const get_single_task = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task_id = req.params.task_id;
        const pool = yield mssql_1.default.connect(sql_config_1.sqlConfig);
        let task = yield (yield pool.request()
            .input("task_id", mssql_1.default.VarChar, task_id)
            .execute('get_single_task')).recordset;
        if (!task) {
            return res.status(404).json({
                error: "Task not found"
            });
        }
        else {
            return res.status(200).json(task);
        }
    }
    catch (error) {
        return res.status(500).json({ error: error });
    }
});
exports.get_single_task = get_single_task;
const get_dept_tasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dept_id = req.params.dept_id;
        const pool = yield mssql_1.default.connect(sql_config_1.sqlConfig);
        let tasks = yield (yield pool.request()
            .input("dept_id ", mssql_1.default.VarChar, dept_id)
            .execute('get_dept_tasks')).recordset;
        if (!tasks) {
            return res.status(404).json({
                error: "Tasks not found"
            });
        }
        else {
            return res.status(200).json(tasks);
        }
    }
    catch (error) {
        return res.status(500).json({ error: error });
    }
});
exports.get_dept_tasks = get_dept_tasks;
const get_employee_tasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const assigned_to = req.params.dept_id;
        const pool = yield mssql_1.default.connect(sql_config_1.sqlConfig);
        let tasks = yield (yield pool.request()
            .input("assigned_to ", mssql_1.default.VarChar, assigned_to)
            .execute('get_employee_task')).recordset;
        if (!tasks) {
            return res.status(404).json({
                error: "Tasks not found"
            });
        }
        else {
            return res.status(200).json(tasks);
        }
    }
    catch (error) {
        return res.status(500).json({ error: error });
    }
});
exports.get_employee_tasks = get_employee_tasks;
const get_manager_tasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const created_by = req.params.created_by;
        const pool = yield mssql_1.default.connect(sql_config_1.sqlConfig);
        let tasks = yield (yield pool.request()
            .input("created_by", mssql_1.default.VarChar, created_by)
            .execute('get_manager_tasks')).recordset;
        if (!tasks) {
            return res.status(404).json({
                error: "Tasks not found"
            });
        }
        else {
            return res.status(200).json(tasks);
        }
    }
    catch (error) {
        return res.status(500).json({ error: error });
    }
});
exports.get_manager_tasks = get_manager_tasks;
const update_task = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task_id = req.params.task_id;
        const { title, description, due_date, status, assigned_to, estimated_effort, labels } = req.body;
        let { error } = task_validator_1.update_task_schema.validate(req.body);
        if (error) {
            return res.status(400).json({
                error: error.details[0].message
            });
        }
        const pool = yield mssql_1.default.connect(sql_config_1.sqlConfig);
        let result = yield pool.request()
            .input("task_id", mssql_1.default.VarChar, task_id)
            .input("title", mssql_1.default.VarChar, title)
            .input("description", mssql_1.default.VarChar, description)
            .input("due_date", mssql_1.default.VarChar, due_date)
            .input("status", mssql_1.default.VarChar, status)
            .input("assigned_to", mssql_1.default.VarChar, assigned_to)
            .input("estimated_effort", mssql_1.default.Int, estimated_effort)
            .input("labels", mssql_1.default.VarChar, labels)
            .execute('update_task');
        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({
                error: "Task not found"
            });
        }
        return res.status(200).json({
            message: "Task updated successfully"
        });
    }
    catch (error) {
        return res.status(500).json({ error: error });
    }
});
exports.update_task = update_task;
const delete_task = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task_id = req.params.task_id;
        const pool = yield mssql_1.default.connect(sql_config_1.sqlConfig);
        let result = (yield pool.request()
            .input("task_id", mssql_1.default.VarChar, task_id)
            .execute('delete_task')).rowsAffected;
        if (result[0] == 0) {
            return res.status(201).json({
                error: "Task not found"
            });
        }
        else {
            return res.status(200).json({
                message: "Task deleted successfully"
            });
        }
    }
    catch (error) {
        return res.status(500).json({ error: error });
    }
});
exports.delete_task = delete_task;
