import express, { json, Response, Request, NextFunction } from 'express';
import dotenv from 'dotenv';
import { sqlConfig } from './Config/sql.config';
import mssql, { ConnectionPool } from 'mssql';
import cors from 'cors';
import authRouter from './Routes/auth.router';
import userRouter from './Routes/user.router';
import deptRouter from './Routes/dept.router';
import taskRouter from './Routes/task.router';

const app = express();

dotenv.config();

app.use(json());
app.use(cors());

app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/dept', deptRouter)
app.use('/task', taskRouter)

const PORT = process.env.PORT || 3000;

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({
        error: error.message
    })
})

mssql.connect(sqlConfig, (err?: Error, connect?: ConnectionPool, req?: Request, res?: Response) => {
    if (err) {
        console.error("Failed to connect to the database", err);
    } else if (connect) {
        console.log("Connected to MSSQL DB");
        app.listen(PORT, () => {
            console.log('App is listening on port', PORT);
        });
    }
})

