import mssql, { VarChar } from 'mssql';
import bcrypt from 'bcrypt';
import { Request, Response } from "express";
import {v4} from 'uuid';
import { sqlConfig } from "../Config/sql.config";
import { user } from '../Interfaces/user.interface';
import { register_user_schema, update_user_schema } from '../Validators/user.validator';


export const register_user = async (req: Request, res: Response) => {
    try {
        const user_id = v4()

        const {first_name, last_name, phone, email, role, dept_id, password, created_at, updated_at}:user = req.body

        // console.log(req.body);
        
        let hashed_pwd = await bcrypt.hash(password, 4)

        let {error} = register_user_schema.validate(req.body)

        if(error){
            return res.status(400).json({
                error: error
            })
        }

        const pool = await mssql.connect(sqlConfig)

        let result = await(await pool.request()
        .input("user_id", mssql.VarChar, user_id)
        .input("first_name", mssql.VarChar, first_name)
        .input("last_name", mssql.VarChar, last_name)
        .input("email", mssql.VarChar, email)
        .input("phone", mssql.VarChar, phone)
        .input("role", mssql.VarChar, role)
        .input("dept_id", mssql.VarChar, dept_id)
        .input("password", mssql.VarChar, hashed_pwd)
        .input("created_at", mssql.DateTime, created_at)
        .input("updated_at", mssql.DateTime, updated_at)
        .execute('create_user')).rowsAffected

        return res.json({
            message:"Account created successfully",
        })
    } catch (error) {
        return res.status(500).json({error: error})
    }
}



export const get_all_users = async(req: Request, res:Response)=>{
    try {
        const pool = await mssql.connect(sqlConfig)

        let users = await(await pool.request().execute('get_all_users')).recordset

        return res.status(200).json(users)
    } catch (error) {
        return res.status(500).json({ error: error });
    }
}


export const get_single_user = async (req: Request, res: Response) => {
    try {
        const user_id = req.params.user_id

        const pool = await mssql.connect(sqlConfig)

        let user = await ( await pool.request()
        .input("user_id", mssql.VarChar, user_id)
        .execute('get_single_user')).recordset

        if (!user) {
            return res.status(404).json({
                error: "User not found"
            });
        } else {
            return res.status(200).json(user);
        }
    } catch (error) {
        return res.status(500).json({ error: error });
    }
}

export const update_user = async (req: Request, res: Response) =>{
    // try {
    //     const user_id = req.params.user_id

    //     const {first_name, last_name, phone, email, role, dept_id, password, created_at, updated_at}:user = req.body
    // } catch (error) {
        
    // }
}

export const delete_user = async (req: Request, res: Response) => {
    try {
        const user_id = req.params.user_id

        const pool = await mssql.connect(sqlConfig)

        let result = await(await pool.request()
        .input("user_id", mssql.VarChar, user_id)
        .execute('delete_user')).rowsAffected

        console.log(result[0]);
        
        if(result[0] == 0){
            return res.status(201).json({
                error: "User not found"
            })
        }else{
            return res.status(200).json({
                message: "Account deleted successfully"
            })
        } 
    } catch (error) {
        return res.json({error})
    }
}