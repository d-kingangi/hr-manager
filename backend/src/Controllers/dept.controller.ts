import mssql from 'mssql';
import { Request, Response } from "express";
import { v4 } from 'uuid';
import { sqlConfig } from '../Config/sql.config';
import { new_dept_schema, update_dept_schema } from '../Validators/dept.validator';
import { department } from '../Interfaces/dept.interface';


/**
 * Creates a new department in the database.
 *
 * @param {Request} req - The request object containing the department details in the request body.
 * @param {Response} res - The response object to send the result of the operation.
 * @returns {Promise<Response>} A Promise that resolves to the response object with a success message or an error message.
 */
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
        .input("dept_id", mssql.VarChar, dept_id)
        .input("name", mssql.VarChar, name)
        .input("manager_id", mssql.VarChar, manager_id)
        .input("description", mssql.VarChar, description)
        .execute('create_dept')).rowsAffected

        return res.status(201).json({
            message: "Department created successfully",
        });
    } catch (error) {
        return res.status(500).json({ error: error });
    }
}

/**
 * Retrieves all departments from the database and returns them in a JSON format.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<Response>} A promise that resolves to a JSON response containing the retrieved departments.
 * @throws {Error} If there is an error connecting to the database or retrieving the departments.
 */
export const get_all_depts = async (req: Request, res: Response)=>{
    try{
        const pool = await mssql.connect(sqlConfig)

        let depts = await(await pool.request().execute('get_all_depts')).recordset

        return res.status(200).json(depts);

    } catch (error){
        return res.status(500).json({ error: error });
    }
}


/**
 * Retrieves a single department based on the department ID.
 *
 * @param {Request} req - The request object containing the department ID.
 * @param {Response} res - The response object to send the department information.
 * @return {Promise<Response>} A Promise that resolves to the response object with the department details or an error message.
 */
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


/**
 * Retrieves the employees of a department based on the department ID.
 *
 * @param {Request} req - The request object containing the department ID.
 * @param {Response} res - The response object to send the employee information.
 * @return {Promise<Response>} A Promise that resolves to the response object with the employee details or an error message.
 */
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


/**
 * Updates a department in the database.
 *
 * @param {Request} req - The request object containing the department details in the request body.
 * @param {Response} res - The response object to send the result of the operation.
 * @returns {Promise<Response>} A Promise that resolves to the response object with a success message or an error message.
 */
export const update_dept = async (req: Request, res: Response) => {
    try {
        const dept_id = req.params.dept_id;
        const { name, manager_id, description }: department = req.body;

        let { error } = update_dept_schema.validate(req.body);
        if (error) {
            return res.status(400).json({
                error: error.details[0].message
            });
        }

        const pool = await mssql.connect(sqlConfig);

        let result = await pool.request()
            .input("dept_id", mssql.VarChar, dept_id)
            .input("name", mssql.VarChar, name)
            .input("manager_id", mssql.VarChar, manager_id)
            .input("description", mssql.VarChar, description)
            .execute('update_dept');

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({
                error: "Department not found"
            });
        }

        return res.status(200).json({
            message: "Department updated successfully"
        });
    } catch (error) {
        return res.status(500).json({ error: error});
    }
};

/**
 * Deletes a department from the database based on the department ID.
 *
 * @param {Request} req - The request object containing the department ID.
 * @param {Response} res - The response object to send the result of the operation.
 * @returns {Promise<Response>} A Promise that resolves to the response object with a success message or an error message.
 */
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