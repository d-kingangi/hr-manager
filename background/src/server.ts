import express from 'express'
import cron from 'node-cron'
import { welcome_user, new_task, completed_task } from './Services/mail.service'

const app = express()

const run = async () => {
    cron.schedule('*/50 * * * * *', async () => {
        console.log('checking for a new user');
    
        await welcome_user()
    })
}

const run2 = async () => {
    cron.schedule('*/50 * * * * *', async () => {
        console.log('checking for a new task');

        await new_task()
    })
}

run()
run2()

app.listen(4201, () => {
    console.log("server running ...");
})