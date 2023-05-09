const Joi = require('joi');


const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string(),
  phone: Joi.string(),
  favorite: Joi.boolean()
})

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required()
})


module.exports = {
  contactSchema,
  updateFavoriteSchema
}