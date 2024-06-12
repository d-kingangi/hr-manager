import joi from 'joi'

export const new_dept_schema = joi.object({
    name: joi.string().required(),
    manager_id: joi.string().required(),
    description: joi.string()
})

export const update_dept_schema = joi.object({
    name: joi.string().required(),
    manager_id: joi.string().required(),
    description: joi.string()
})