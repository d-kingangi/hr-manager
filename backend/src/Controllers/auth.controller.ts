import { Request, Response } from "express"
import bcrypt from 'bcrypt';
import mssql from "mssql";
import jwt from "jsonwebtoken";
import { sqlConfig } from "../Config/sql.config"
import { login_user_schema } from "../Validators/auth.validator";
import { ExtendedUserRequest } from "../Middleware/verify_token";


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

export const login_user = async(req: Request, res: Response)=>{
    try {
        const{email, password} = req.body

        let {error} = login_user_schema.validate(req.body)

        if(error){
            return res.status(201).json({
                error: error.details[0].message
            })
        }

        const pool = await mssql.connect(sqlConfig)
        
        let user = (await pool.request()
        .input("email", email)
        .input("password", password)
        .execute("login_user")).recordset
        
        if(user[0]?.email == email){
            const correct_pwd = await bcrypt.compare(password, user[0].password)

            if(!correct_pwd){
                 return res.status(201).json({
                    error: "Incorrect password"
                 });
            }

            const loginCredentials = user.map(response =>{
                const{password, ...rest} = response

                return rest
            })            

            const token = jwt.sign(loginCredentials[0], process.env.SECRET as string, {
                expiresIn: '36000s'
            })
            
            return res.status(200).json({
                message: "Logged in successfully", token
                // ...loginCredentials[0]
            })
            
        }else{
            return res.json({
                error: "User not found"
            });
        }
        

    } catch (error) {
        return res.sendStatus(501).json({
            error: "Internal Server Error"
        })
    }
}



/**
 * Asynchronously checks the user details by retrieving the user information from the request object and returning it as a JSON response.
 *
 * @param {ExtendedUserRequest} req - The request object containing the user information.
 * @param {Response} res - The response object to send the JSON response.
 * @return {Promise<void>} A Promise that resolves when the response is sent.
 */

export const check_user_details =async (req: ExtendedUserRequest, res: Response) => {
    if(req.info){
        return res.json({
            info: req.info
        })
    }
}


/**
 * Asynchronously resets the password for a user with the given email.
 *
 * @param {Request} req - The request object containing the email and new password.
 * @param {Response} res - The response object to send the JSON response.
 * @return {Promise<void>} A Promise that resolves when the response is sent.
 * @throws {Error} If there is an error connecting to the database or updating the password.
 */
export const reset_password = async (req:Request, res:Response) => {
    try {
        const {email, password} = req.body

        const pool = await mssql.connect(sqlConfig)

        let hashedPwd = await bcrypt.hash(password, 5)

        let result = (await pool.request()
        .input("email", email)
        .input("password", password)
        .execute("reset_password")).rowsAffected

        if(result[0] < 1){
            return res.json({
                message: "User not found"
            })
        }else{
            return res.json({
                message: "Password updated successfully"
            })
        }
    } catch (error) {
        return res.sendStatus(501).json({
            error: error
        })
    }
}


/**
 * A function to log out the user by clearing the token cookie and sending a JSON response with a success message.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object to send the JSON response.
 * @return {void} A Promise that resolves when the response is sent.
 */
export const logout_user = (req: Request, res: Response) => {
    res.clearCookie('token'); 
    res.json({ message: 'Logout successful' });
  };