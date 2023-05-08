const express = require('express');
const { users: ctrl } = require('../../controllers');
const { authenticate } = require('../../middlewares');


const router = express.Router();

router.post('/register', ctrl.register);

router.post('/login', ctrl.login);

router.get('/current', authenticate, ctrl.getCurrent);

router.post('/logout', authenticate, ctrl.logout);

router.patch('/subscription', authenticate, ctrl.subscription);

module.exports = router;