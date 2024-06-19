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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout_user = exports.reset_password = exports.check_user_details = exports.login_user = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const mssql_1 = __importDefault(require("mssql"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sql_config_1 = require("../Config/sql.config");
const auth_validator_1 = require("../Validators/auth.validator");
/**
 * Asynchronously handles the login request by validating the user's credentials,
 * checking them against the database, and returning a JSON response with a token
 * if the credentials are correct.
 *
 * @param {Request} req - The Express request object containing the user's email and password.
 * @param {Response} res - The Express response object to send the JSON response.
 * @return {Promise<void>} A Promise that resolves when the response is sent.
 * @throws {Error} If there is an internal server error.
 */
const login_user = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { email, password } = req.body;
        let { error } = auth_validator_1.login_user_schema.validate(req.body);
        if (error) {
            return res.status(201).json({
                error: error.details[0].message
            });
        }
        const pool = yield mssql_1.default.connect(sql_config_1.sqlConfig);
        let user = (yield pool.request()
            .input("email", email)
            .input("password", password)
            .execute("login_user")).recordset;
        if (((_a = user[0]) === null || _a === void 0 ? void 0 : _a.email) == email) {
            const correct_pwd = yield bcrypt_1.default.compare(password, user[0].password);
            if (!correct_pwd) {
                return res.status(201).json({
                    error: "Incorrect password"
                });
            }
            const loginCredentials = user.map(response => {
                const { password } = response, rest = __rest(response, ["password"]);
                return rest;
            });
            const token = jsonwebtoken_1.default.sign(loginCredentials[0], process.env.SECRET, {
                expiresIn: '36000s'
            });
            return res.status(200).json({
                message: "Logged in successfully", token
                // ...loginCredentials[0]
            });
        }
        else {
            return res.json({
                error: "User not found"
            });
        }
    }
    catch (error) {
        return res.sendStatus(501).json({
            error: "Internal Server Error"
        });
    }
});
exports.login_user = login_user;
/**
 * Asynchronously checks the user details by retrieving the user information from the request object and returning it as a JSON response.
 *
 * @param {ExtendedUserRequest} req - The request object containing the user information.
 * @param {Response} res - The response object to send the JSON response.
 * @return {Promise<void>} A Promise that resolves when the response is sent.
 */
const check_user_details = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.info) {
        return res.json({
            info: req.info
        });
    }
});
exports.check_user_details = check_user_details;
/**
 * Asynchronously resets the password for a user with the given email.
 *
 * @param {Request} req - The request object containing the email and new password.
 * @param {Response} res - The response object to send the JSON response.
 * @return {Promise<void>} A Promise that resolves when the response is sent.
 * @throws {Error} If there is an error connecting to the database or updating the password.
 */
const reset_password = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const pool = yield mssql_1.default.connect(sql_config_1.sqlConfig);
        let hashedPwd = yield bcrypt_1.default.hash(password, 5);
        let result = (yield pool.request()
            .input("email", email)
            .input("password", password)
            .execute("reset_password")).rowsAffected;
        if (result[0] < 1) {
            return res.json({
                message: "User not found"
            });
        }
        else {
            return res.json({
                message: "Password updated successfully"
            });
        }
    }
    catch (error) {
        return res.sendStatus(501).json({
            error: error
        });
    }
});
exports.reset_password = reset_password;
/**
 * A function to log out the user by clearing the token cookie and sending a JSON response with a success message.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object to send the JSON response.
 * @return {void} A Promise that resolves when the response is sent.
 */
const logout_user = (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logout successful' });
};
exports.logout_user = logout_user;
