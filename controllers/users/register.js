const { Conflict } = require('http-errors');
const bcrypt = require('bcrypt');
const User = require('../../models/user');
const { registerSchema } = require('../../schemas');


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
        await User.create({ password: hashPassword, email, subscription });
        res.status(201).json({
            status: "success",
            code: 201,
                user: {
                    email,
                    subscription
                }
        })

    } catch (error) {
        next(error);
    }
}


module.exports = register;