import joi from 'joi';

export const register_user_schema = joi.object({
    first_name: joi.string().required(),
    last_name: joi.string().required(),
    phone: joi.string().required(),
    email: joi.string().required(),
    role: joi.string().required(),
    dept_id: joi.string().required(),
    password: joi.string().required(),
    created_at: joi.date(),
    updated_at: joi.date(),
})

export const update_user_schema = joi.object({
    first_name: joi.string().required(),
    last_name: joi.string().required(),
    phone: joi.string().required(),
    email: joi.string().required(),
    role: joi.string().required(),
    dept_id: joi.string().required(),
    password: joi.string().required(),
    created_at: joi.date(),
    updated_at: joi.date(),
})