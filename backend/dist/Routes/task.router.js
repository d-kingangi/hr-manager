"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verify_token_1 = require("../Middleware/verify_token");
const task_controller_1 = require("../Controllers/task.controller");
const taskRouter = (0, express_1.Router)();
taskRouter.post('/create', task_controller_1.create_task);
taskRouter.get('/all', task_controller_1.get_all_tasks);
taskRouter.get('/:task_id', task_controller_1.get_single_task);
taskRouter.get('/department/:dept_id', task_controller_1.get_dept_tasks);
taskRouter.get('/employee/:assigned_to', task_controller_1.get_employee_tasks);
taskRouter.get('/manager/:created_by', task_controller_1.get_manager_tasks);
taskRouter.put('/update/:task_id', verify_token_1.verify_token, task_controller_1.update_task);
taskRouter.delete('/delete/:task_id', verify_token_1.verify_token, task_controller_1.delete_task);
exports.default = taskRouter;
