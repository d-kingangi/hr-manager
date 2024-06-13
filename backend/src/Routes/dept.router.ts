import { Router } from "express";
import { verify_token } from "../Middleware/verify_token";
import { create_dept, get_all_depts, get_single_dept, get_dept_employees, update_dept, delete_dept } from "../Controllers/dept.controller";

const deptRouter = Router()

deptRouter.post('/new', create_dept)
deptRouter.get('/all', get_all_depts)
deptRouter.get('/:dept_id', get_single_dept)
deptRouter.get('/:dept_id/employees', get_dept_employees)
deptRouter.put('/update/:dept_id', verify_token, update_dept)
deptRouter.delete('/delete/:dept_id', verify_token, delete_dept)

export default deptRouter