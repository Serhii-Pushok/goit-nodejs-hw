const { NotFound } = require('http-errors');
const Contact = require('../../models/contact');


const removeContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findByIdAndRemove(id);
    if (!result) {
      throw new NotFound("Not found");
    }
    res.json({ 
        status: "success",
        code: 200,
        message: "contact deleted",
        data: {
          result
        }
      });

  } catch (error) {
    next(error);
  }
}

module.exports = removeContact;