const { contactSchema } = require('./contacts');
const { updateFavoriteSchema } = require('./contacts');
const { registerSchema } = require('./users');
const { loginSchema } = require('./users');
const { subscriptionSchema } = require('./users');


module.exports = {
    contactSchema,
    updateFavoriteSchema,
    registerSchema,
    loginSchema,
    subscriptionSchema
}