const { NotFound } = require('http-errors');
const Contact = require('../../models/contact');
const { contactSchema } = require('../../schemas');


const updateContact = async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      error.message = "missing fields";
      throw error;
    }
      const { id } = req.params;
      const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
      if (!result) {
        throw new NotFound("Not found");
      }
      res.json({
        status: "success",
        code: 200,
        data: {
          result
        }
      })
  } catch (error) {
    next(error)
  }
}

module.exports = updateContact;
