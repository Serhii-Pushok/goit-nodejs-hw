const Joi = require('joi');


const contactSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  phone: Joi.string()
    .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
    .messages({"string.pattern.base": "Invalid phone number format. The format should be (XXX) XXX-XXXX."})
    .required()
})


module.exports = contactSchema;