import mssql, { VarChar } from 'mssql';
import bcrypt from 'bcrypt';
import { Request, Response } from "express";
import { v4 } from 'uuid';
import { sqlConfig } from '../Config/sql.config';
import { new_dept_schema, update_dept_schema } from '../Validators/dept.validator';
import { department } from '../Interfaces/dept.interface';

export const create_dept = async (req: Request, res: Response) => {
    try {
        const dept_id = v4()

        const {name, manager_id, description}: department = req.body

        let {error} = new_dept_schema.validate(req.body)

        if (error) {
            return res.status(400).json({ error: error });
        }

        const pool = await mssql.connect(sqlConfig);

        let result = await(await pool.request()
        .input("dept_id", mssql.VarBinary, dept_id)
        .input("name", mssql.VarChar, name)
        .input("manager_id", mssql.VarChar, manager_id)
        .input("description", mssql.VarChar, description)
        .execute('create_dept')).rowsAffected

        return res.status(201).json({
            message: "Post created successfully",
        });
    } catch (error) {
        return res.status(500).json({ error: error });
    }
}


export const get_all_depts = async (req: Request, res: Response)=>{
    try{
        const pool = await mssql.connect(sqlConfig)

        let depts = await(await pool.request().execute('get_all_depts')).recordset

        return res.status(200).json(depts);

    } catch (error){
        return res.status(500).json({ error: error });
    }
}

export const get_single_dept = async (req: Request, res: Response) => {
    try {
        const dept_id = req.params.dept_id

        const pool = await mssql.connect(sqlConfig)

        let dept = await(await pool.request()
        .input("dept_id", mssql.VarChar, dept_id)
        .execute('get_single_dept')).recordset

        if(!dept){
            return res.status(404).json({
                error : "Department not found"
            })        
        } else {
            return res.status(200).json(dept)
        }
    } catch (error) {
        return res.status(500).json({ error: error });
    }
}

export const get_dept_employees = async (req: Request, res: Response) => {
    try {
        const dept_id = req.params.dept_id

        const pool = await mssql.connect(sqlConfig)

        let employees = await(await pool.request()
        .input("dept_id", mssql.VarChar, dept_id)
        .execute('get_dept_employees')).recordset

        if(!employees){
            return res.status(404).json({
                error: "Employees not found"
            })
        } else {
            return res.status(200).json(employees)
        }
    } catch (error) {
        return res.status(500).json({error: error})
    }
}

// export const update_dept = async (req: Request, res: Response) => {
//     try {
//         const dept_id = req.params.dept_id

//         const update_dept
//     } catch (error) {
        
//     }
// }


export const delete_dept = async (req: Request, res: Response) => {
    try {
        const dept_id = req.params.dept_id

        const pool = await mssql.connect(sqlConfig)

        let result = await( await pool.request()
        .input("dept_id", mssql.VarChar, dept_id)
        .execute('delete_dept')).rowsAffected

        if (result[0] == 0) {
            return res.status(404).json({
                error: "Department not found"
            });
        } else {
            return res.status(200).json({
                message: "Department deleted successfully"
            });
        }
    } catch (error) {
        return res.status(500).json({ error: error })
    }
}