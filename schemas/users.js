const Joi = require('joi');


const registerSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().required(),
    subscription: Joi.string(),
    token: Joi.string()
});

const loginSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().required()
});

const subscriptionSchema = Joi.object({
    subscription: Joi.string().required()
})

const verifyEmailSchema = Joi.object({
    email: Joi.string().required()
});


module.exports = {
    registerSchema,
    loginSchema,
    subscriptionSchema,
    verifyEmailSchema
};
