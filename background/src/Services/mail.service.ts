import mssql from 'mssql';
import { sqlConfig } from '../Config/sqlConfig';
import ejs from 'ejs';

export const welcome_user = async () =>{
    const pool = await mssql.connect(sqlConfig)

    const users = (await pool.request().execute("welcome_user")).recordset

    console.log(users);

    for( let user of users){
        ejs.renderFile('templates/register.ejs', { first_name: user.first_name, last_name: user.last_name}, async (error, data) => {
            let mailOptions = {
                from: "itsronduncan@gmail.com",
                to: user.email,
                subject: "Welcome",
                html: data
            }

            try {
                wait sendMail(mailOptions)

                await pool.request().query('UPDATE users SET isWelcomed = 1 WHERE isWelcomed = 0 AND isDeleted = 0')

                console.log("Email sent to new user");

            } catch (error) {
                console.log(error)
            }
        })
    }
}

export const new_task = async () =>{
    const pool = await mssql.connect(sqlConfig)

    const tasks = (await pool.request().execute("new_task")).recordset

    console.log(tasks);

    for( let task of tasks){
        ejs.renderFile('templates/register.ejs', { title: task.title, description: new_task.description, due_date: new_task.due_date}, async (error, data) => {
            let mailOptions = {
                from: "itsronduncan@gmail.com",
                to: task.email,
                subject: "Welcome",
                html: data
            }

            try {
                wait sendMail(mailOptions)

                await pool.request().query('UPDATE task SET is_notified = 1 WHERE is_notified = 0 ')

                console.log("Email sent to user to notify new task");
            } catch (error) {
                console.log(error)
            }
        })
    }
}


export const completed_task = async () =>{
    const pool = await mssql.connect(sqlConfig)

    const tasks = (await pool.request().execute("completed_task")).recordset

    console.log(tasks);

    for( let task of tasks){
        ejs.renderFile('templates/register.ejs', { title: task.title, description: new_task.description, due_date: new_task.due_date}, async (error, data) => {
            let mailOptions = {
                from: "itsronduncan@gmail.com",
                to: task.email,
                subject: "Welcome",
                html: data
            }

            try {
                wait sendMail(mailOptions)

                await pool.request().query('UPDATE task SET is_completed = 1 WHERE is_completed = 0 AND isDeleted = 0')

                console.log("Email sent to user to notify new task");
            } catch (error) {
                console.log(error)
            }
        })
    }
}