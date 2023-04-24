const express = require('express');
const { NotFound } = require('http-errors');
const Joi = require('joi');
const contactsOperations = require('../../models/contacts');

const router = express.Router()

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

router.get('/', async (req, res, next) => {
  try {
      const contacts = await contactsOperations.listContacts();
      res.json({ 
        status: "success",
        code: 200,
        data: {
          result: contacts
      }
      });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
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
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      error.message = "missing required name field";
      throw error;
    }
    const result = await contactsOperations.addContact(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result
      }
    })

  } catch (error) {
    next(error);
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsOperations.removeContact(id);
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
})

router.put('/:id', async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      error.message = "missing fields";
      throw error;
    }
      const { id } = req.params;
      const result = await contactsOperations.updateContact(id, req.body);
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
})

module.exports = router
