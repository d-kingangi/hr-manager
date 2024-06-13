import { Router } from "express";
import { verify_token } from "../Middleware/verify_token";
import { login_user, check_user_details, reset_password, logout_user } from "../Controllers/auth.controller";

const authRouter = Router()

authRouter.post('/login', login_user)
authRouter.get('/checkdetails', verify_token, check_user_details)
authRouter.put('/resetPassword', verify_token, reset_password)
authRouter.post('/logout', verify_token, logout_user);


export default authRouter 