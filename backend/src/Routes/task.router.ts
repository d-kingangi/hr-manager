import { Router } from "express";
import { verify_token } from "../Middleware/verify_token";
import { create_task, get_all_tasks, get_single_task, get_dept_tasks, get_employee_tasks, get_manager_tasks, update_task, delete_task } from "../Controllers/task.controller";

const taskRouter = Router()

taskRouter.post('/create', create_task)
taskRouter.get('/all', verify_token, get_all_tasks)
taskRouter.get('/task/:task_id', verify_token, get_single_task)
taskRouter.get('/department/:dept_id', verify_token, get_dept_tasks)
taskRouter.get('/employee/:assigned_to', verify_token, get_employee_tasks)
taskRouter.get('/manager/:created_by', verify_token, get_manager_tasks)
taskRouter.put('/update/:task_id', verify_token, update_task)
taskRouter.delete('/delete/:task_id', verify_token, delete_task)

export default taskRouter