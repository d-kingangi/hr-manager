import joi from 'joi'

export const login_user_schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
})