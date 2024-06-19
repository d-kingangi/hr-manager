"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sqlConfig = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// This code snippet imports the dotenv module to load environment variables from a .env file. 
// It then defines a sqlConfig object containing database connection details like user, database name, password, server, pool settings, and encryption options
exports.sqlConfig = {
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PWD,
    server: process.env.SERVER,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000,
    },
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};
// This code snippet imports the dotenv module to load environment variables from a .env file. It then defines a sqlConfig object containing database connection details like user, database name, password, server, pool settings, and encryption options
