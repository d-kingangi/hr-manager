import joi from 'joi';

export const new_task_schema = joi.object({
    title: joi.string().required(),
    description: joi.string().required(),
    due_date: joi.date().required(),
    status: joi.string().required,
    assigned_to: joi.string(),
    created_at: joi.date().required,
    estimated_effort: joi.number(),
    completed_at: joi.string(),
    labels: joi.string()
})

export const update_task_schema = joi.object({
    title: joi.string().required(),
    description: joi.string().required(),
    due_date: joi.date().required(),
    status: joi.string().required,
    assigned_to: joi.string(),
    created_at: joi.date().required,
    estimated_effort: joi.number(),
    completed_at: joi.string(),
    labels: joi.string()
})