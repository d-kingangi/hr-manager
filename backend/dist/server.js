"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const sql_config_1 = require("./Config/sql.config");
const mssql_1 = __importDefault(require("mssql"));
const cors_1 = __importDefault(require("cors"));
const auth_router_1 = __importDefault(require("./Routes/auth.router"));
const user_router_1 = __importDefault(require("./Routes/user.router"));
const dept_router_1 = __importDefault(require("./Routes/dept.router"));
const task_router_1 = __importDefault(require("./Routes/task.router"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use((0, express_1.json)());
app.use((0, cors_1.default)());
app.use('/auth', auth_router_1.default);
app.use('/user', user_router_1.default);
app.use('/dept', dept_router_1.default);
app.use('/task', task_router_1.default);
const PORT = process.env.PORT || 3000;
app.use((error, req, res, next) => {
    res.status(500).json({
        error: error.message
    });
});
mssql_1.default.connect(sql_config_1.sqlConfig, (err, connect, req, res) => {
    if (err) {
        console.error("Failed to connect to the database", err);
    }
    else if (connect) {
        console.log("Connected to MSSQL DB");
        app.listen(PORT, () => {
            console.log('App is listening on port', PORT);
        });
    }
});
