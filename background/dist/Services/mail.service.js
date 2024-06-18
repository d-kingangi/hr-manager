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
exports.completed_task = exports.new_task = exports.welcome_user = void 0;
const mssql_1 = __importDefault(require("mssql"));
const sql_config_1 = require("../Config/sql.config");
const ejs_1 = __importDefault(require("ejs"));
const welcome_user = () => __awaiter(void 0, void 0, void 0, function* () {
    const pool = yield mssql_1.default.connect(sql_config_1.sqlConfig);
    const users = (yield pool.request().execute("welcome_user")).recordset;
    console.log(users);
    for (let user of users) {
        ejs_1.default.renderFile('templates/register.ejs', { first_name: user.first_name, last_name: user.last_name }, (error, data) => __awaiter(void 0, void 0, void 0, function* () {
            let mailOptions = {
                from: "randomtestemail675439@gmail.com",
                to: user.email,
                subject: "Welcome",
                html: data
            };
            try {
                wait;
                sendMail(mailOptions);
                yield pool.request().query('UPDATE users SET isWelcomed = 1 WHERE isWelcomed = 0 AND isDeleted = 0');
                console.log("Email sent to new user");
            }
            catch (error) {
                console.log(error);
            }
        }));
    }
});
exports.welcome_user = welcome_user;
const new_task = () => __awaiter(void 0, void 0, void 0, function* () {
    const pool = yield mssql_1.default.connect(sql_config_1.sqlConfig);
    const tasks = (yield pool.request().execute("new_task")).recordset;
    console.log(tasks);
    for (let task of tasks) {
        ejs_1.default.renderFile('templates/register.ejs', { title: task.title, description: exports.new_task.description, due_date: exports.new_task.due_date }, (error, data) => __awaiter(void 0, void 0, void 0, function* () {
            let mailOptions = {
                from: "randomtestemail675439@gmail.com",
                to: task.email,
                subject: "Task  assigned.",
                html: data
            };
            try {
                wait;
                sendMail(mailOptions);
                yield pool.request().query('UPDATE task SET is_notified = 1 WHERE is_notified = 0 ');
                console.log("Email sent to user to notify new task");
            }
            catch (error) {
                console.log(error);
            }
        }));
    }
});
exports.new_task = new_task;
const completed_task = () => __awaiter(void 0, void 0, void 0, function* () {
    const pool = yield mssql_1.default.connect(sql_config_1.sqlConfig);
    const tasks = (yield pool.request().execute("completed_task")).recordset;
    console.log(tasks);
    for (let task of tasks) {
        ejs_1.default.renderFile('templates/register.ejs', { title: task.title, description: exports.new_task.description, due_date: exports.new_task.due_date }, (error, data) => __awaiter(void 0, void 0, void 0, function* () {
            let mailOptions = {
                from: "randomtestemail675439@gmail.com",
                to: task.email,
                subject: "Welcome",
                html: data
            };
            try {
                wait;
                sendMail(mailOptions);
                yield pool.request().query('UPDATE task SET is_completed = 1 WHERE is_completed = 0 AND isDeleted = 0');
                console.log("Email sent to user to notify new task");
            }
            catch (error) {
                console.log(error);
            }
        }));
    }
});
exports.completed_task = completed_task;
