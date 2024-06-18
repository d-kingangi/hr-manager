"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verify_token_1 = require("../Middleware/verify_token");
const user_controller_1 = require("../Controllers/user.controller");
const userRouter = (0, express_1.Router)();
userRouter.post('/register', user_controller_1.register_user);
userRouter.get('/all', user_controller_1.get_all_users);
userRouter.get('/user/:user_id', user_controller_1.get_single_user);
userRouter.put('/update/:user_id', verify_token_1.verify_token, user_controller_1.update_user);
userRouter.delete('/delete/:user_id', verify_token_1.verify_token, user_controller_1.delete_user);
exports.default = userRouter;
