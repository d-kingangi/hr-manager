import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { user } from "../Interfaces/user.interface";
import { login_user_details } from "../Interfaces/auth.interface";

dotenv.config()

export interface ExtendedUserRequest extends Request{
    info?: login_user_details
}

export const verifyToken = (req:ExtendedUserRequest, res: Response, next: NextFunction) =>{
    try {
        const token = req.headers['token'] as string

        if(!token){
            return res.json({
                message: "You do not have access"
            })
        }

        const data = jwt.verify(token, process.env.SECRET as string) as login_user_details

        req.info = data
        
        
    } catch (error) {
        return res.json({
            error: error
        })
    }

    next()
}