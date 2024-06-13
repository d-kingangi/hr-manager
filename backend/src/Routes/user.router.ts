import { Router } from "express";
import { verify_token } from "../Middleware/verify_token";
import { register_user, get_all_users, get_single_user, update_user, delete_user } from "../Controllers/user.controller";

const userRouter = Router()

userRouter.post('/register', register_user)
userRouter.get('/all', get_all_users)
userRouter.get('/user/:user_id', get_single_user)
userRouter.put('/update/:user_id', verify_token, update_user)
userRouter.delete('/delete/:user_id', verify_token, delete_user)

export default userRouter