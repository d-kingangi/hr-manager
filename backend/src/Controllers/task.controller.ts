import mssql from 'mssql';
import { Request, Response } from "express";
import { v4 } from 'uuid';
import { sqlConfig } from '../Config/sql.config';
import { new_task_schema, update_task_schema } from '../Validators/task.validator';
import { task } from '../Interfaces/task.interface';


export const create_task = async (req: Request, res: Response) => {
    try {
        const task_id = v4()

        const {title, description, due_date, status, assigned_to, created_by, estimated_effort, labels}: task = req.body

        let {error} = new_task_schema.validate(req.body)

        if (error) {
            return res.status(400).json({ error: error });
        }

        const pool = await mssql.connect(sqlConfig);

        let result = await( await pool.request()
        .input("task_id", mssql.VarChar, task_id)
        .input("title", mssql.VarChar, title)
        .input("description", mssql.VarChar, description)
        .input("due_date", mssql.VarChar, due_date)
        .input("status", mssql.VarChar, status)
        .input("assigned_to", mssql.VarChar, assigned_to)
        .input("created_by", mssql.VarChar, created_by)
        .input("estimated_effort", mssql.Int, estimated_effort)
        .input("labels", mssql.VarChar, labels)
        .execute('create_task')).rowsAffected

        return res.status(201).json({
            message: "Task created successfully",
        });
    } catch (error) {
        return res.status(500).json({ error: error });
    }
}

export const get_all_tasks = async (req: Request, res: Response) => {
    try {
        const pool = await mssql.connect(sqlConfig);
        
        let tasks = await(await pool.request().execute('get_all_tasks')).recordset

        if(!tasks){
            return res.status(404).json({
                error: "Tasks not found"
            });
        } else {
            return res.status(200).json(tasks);
        }

    } catch (error) {
        return res.status(500).json({ error: error });
    }
}

export const get_single_task = async (req: Request, res: Response) => {
    try {
        const task_id = req.params.task_id

        const pool = await mssql.connect(sqlConfig)

        let task = await(await pool.request()
        .input("task_id", mssql.VarChar, task_id)
        .execute('get_single_task')).recordset

        if (!task) {
            return res.status(404).json({
                error: "Task not found"
            });
        } else {
            return res.status(200).json(task);
        }
    } catch (error) {
        return res.status(500).json({ error: error })
    }
}

export const get_dept_tasks = async (req: Request, res: Response) => {
    try {
        const dept_id = req.params.dept_id

        const pool = await mssql.connect(sqlConfig)

        let tasks = await(await pool.request()
        .input("dept_id ", mssql.VarChar, dept_id )
        .execute('get_dept_tasks')).recordset

        if(!tasks){
            return res.status(404).json({
                error: "Tasks not found"
            });
        } else {
            return res.status(200).json(tasks);
        }
    } catch (error) {
        return res.status(500).json({ error: error });
    }
}

export const get_employee_tasks = async (req: Request, res: Response) => {
    try {
        const assigned_to = req.params.dept_id

        const pool = await mssql.connect(sqlConfig)

        let tasks = await(await pool.request()
        .input("assigned_to ", mssql.VarChar, assigned_to )
        .execute('get_employee_task')).recordset

        if(!tasks){
            return res.status(404).json({
                error: "Tasks not found"
            });
        } else {
            return res.status(200).json(tasks);
        }
    } catch (error) {
        return res.status(500).json({ error: error });
    }
}

export const get_manager_tasks = async (req: Request, res: Response) => {
    try {
        const created_by = req.params.created_by

        const pool = await mssql.connect(sqlConfig)

        let tasks = await(await pool.request()
        .input("created_by", mssql.VarChar, created_by )
        .execute('get_manager_tasks')).recordset

        if(!tasks){
            return res.status(404).json({
                error: "Tasks not found"
            });
        } else {
            return res.status(200).json(tasks);
        }
    } catch (error) {
        return res.status(500).json({ error: error });
    }
}


export const update_task = async (req: Request, res: Response) => {
    try {
        const task_id = req.params.task_id;
        
        const { title, description, due_date, status, assigned_to, estimated_effort, labels }: task = req.body;

        let { error } = update_task_schema.validate(req.body);
        if (error) {
            return res.status(400).json({
                error: error.details[0].message
            });
        }

        const pool = await mssql.connect(sqlConfig);

        let result = await pool.request()
            .input("task_id", mssql.VarChar, task_id)
            .input("title", mssql.VarChar, title)
            .input("description", mssql.VarChar, description)
            .input("due_date", mssql.VarChar, due_date)
            .input("status", mssql.VarChar, status)
            .input("assigned_to", mssql.VarChar, assigned_to)
            .input("estimated_effort", mssql.Int, estimated_effort)
            .input("labels", mssql.VarChar, labels)
            .execute('update_task');

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({
                error: "Task not found"
            });
        }

        return res.status(200).json({
            message: "Task updated successfully"
        });
    } catch (error) {
        return res.status(500).json({ error: error });
    }
}


export const delete_task = async (req: Request, res: Response) => {
    try {
        const task_id = req.params.task_id

        const pool = await mssql.connect(sqlConfig)

        let result = (await pool.request()
        .input("task_id", mssql.VarChar, task_id)
        .execute('delete_task')
        ).rowsAffected

        if(result[0] == 0){
            return res.status(201).json({
                error: "Task not found"
            })
        }else{
            return res.status(200).json({
                message: "Task deleted successfully"
            })
        }  
    } catch (error) {
        return res.status(500).json({ error: error });
    }
}