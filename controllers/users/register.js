const { Conflict } = require('http-errors');
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const { nanoid } = require('nanoid');
const User = require('../../models/user');
const { registerSchema } = require('../../schemas');
const { sendEmail } = require('../../helpers');


require('dotenv').config();
const { BASE_URL } = process.env;

const register = async (req, res, next) => {
    try {
        const { error } = registerSchema.validate(req.body);
        if (error) {
            error.status = 400;
            error.message = "missing required field";
            throw error;
        }

        const { password, email, subscription } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            throw new Conflict('Email in use');
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const avatarURL = gravatar.url(email);
        const verificationToken = nanoid();
        await User.create({ password: hashPassword, email, subscription, avatarURL, verificationToken });

        const verifyEmail = {
            to: email,
            subject: 'Verify email',
            html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click to verify email</a>`
        }

        await sendEmail(verifyEmail);

        res.status(201).json({
            status: "success",
            code: 201,
                user: {
                    email,
                    subscription,
                    avatarURL
                }
        })
    } catch (error) {
        next(error);
    }
}


module.exports = register;