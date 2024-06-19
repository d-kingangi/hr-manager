import joi from 'joi';

export const new_task_schema = joi.object({
    title: joi.string().required(),
    description: joi.string().required(),
    due_date: joi.date().required(),
    status: joi.string(),
    assigned_to: joi.string(),
    created_by: joi.string(),
    estimated_effort: joi.number(),
    completed_at: joi.string(),
    labels: joi.string()
})

export const update_task_schema = joi.object({
    title: joi.string().required(),
    description: joi.string().required(),
    due_date: joi.date().required(),
    status: joi.string(),
    assigned_to: joi.string(),
    created_by: joi.string(),
    estimated_effort: joi.number(),
    completed_at: joi.string(),
    labels: joi.string()
})