const { NotFound } = require('http-errors');
const contactsOperations = require('../../models/contacts');


const getContactById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsOperations.getContactById(id);
    if (!result) {
      throw new NotFound("Not found");
    }
    res.json({ 
        status: "success",
        code: 200,
        data: {
          result
      }
      });
  } catch (error) {
    next(error);
  }
}

module.exports = getContactById;