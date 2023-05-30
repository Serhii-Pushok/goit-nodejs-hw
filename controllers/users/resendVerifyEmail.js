const { NotFound } = require('http-errors');
const User = require('../../models/user');
const { verifyEmailSchema } = require('../../schemas');
const { sendEmail } = require('../../helpers');


require('dotenv').config();
const { BASE_URL } = process.env;

const resendVerifyEmail = async (req, res, next) => {
    try {
        const { error } = verifyEmailSchema.validate(req.body);
        if (error) {
            error.status = 400;
            error.message = "missing required field email";
            throw error;
        }

        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            throw new NotFound("Not found");
        }

        const verifyEmail = {
            to: email,
            subject: 'Verify email',
            html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Click to verify email</a>`
        }

        await sendEmail(verifyEmail);

        if (user.verify) {
            res.json({
            status: "success",
            code: 400,
            message: 'Verification has already been passed'
            })
        }

    } catch (error) {
        next(error);
    }
}


module.exports = resendVerifyEmail;