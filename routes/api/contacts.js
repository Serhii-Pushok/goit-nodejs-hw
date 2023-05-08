const express = require('express');
const { contacts: ctrl } = require('../../controllers');
const { isValidId, authenticate } = require('../../middlewares');


const router = express.Router();

router.get('/', authenticate, ctrl.listContacts);

router.get('/:id', authenticate, isValidId, ctrl.getContactById);

router.post('/', authenticate, ctrl.addContact);

router.delete('/:id', authenticate, isValidId, ctrl.removeContact);

router.put('/:id', authenticate, isValidId, ctrl.updateContact);

router.patch('/:id/favorite', authenticate, isValidId, ctrl.updateStatusContact);


module.exports = router;
