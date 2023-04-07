import joi from "joi";

export const signUpSchema = joi.object({
    name: joi.string().min(3).required(),
    email: joi.string().min(5).email({minDomainSegments: 2, tlds: {allow: ['com','net','br']}}).required(),
    password: joi.string().min(3).required(),
    confirmPassword: joi.ref('password'),
    specialty: joi.string().required(),
    state: joi.string().required(),
    city: joi.string().required(),
    address: joi.string().required()
})

export const signInSchema = joi.object({
    email: joi.string().min(5).email({minDomainSegments: 2, tlds: {allow: ['com','net','br']}}).required(),
    password: joi.string().min(3).required()
})