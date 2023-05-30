const express = require('express');
const { users: ctrl } = require('../../controllers');
const { authenticate, upload } = require('../../middlewares');


const router = express.Router();

router.post('/register', ctrl.register);

router.post('/login', ctrl.login);

router.get('/current', authenticate, ctrl.getCurrent);

router.post('/logout', authenticate, ctrl.logout);

router.patch('/subscription', authenticate, ctrl.subscription);

router.patch('/avatars', authenticate, upload.single('avatar'), ctrl.updateAvatar);

router.get('/verify/:verificationToken', ctrl.verifyEmail);

router.post('/verify', ctrl.resendVerifyEmail);

module.exports = router;