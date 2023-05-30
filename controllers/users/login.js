const { Unauthorized } = require('http-errors');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const { loginSchema } = require('../../schemas');


require('dotenv').config();

const { SECRET_KEY } = process.env;

const login = async (req, res, next) => {
    try {
        const { error } = loginSchema.validate(req.body);
        if (error) {
            error.status = 400;
            error.message = "missing required field";
            throw error;
        }

        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !user.verify || !user.comparePassword(password)) {
             throw new Unauthorized('Email or password is wrong, or not verify');
        }

        const payload = {
            id: user._id
        }

        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });
        await User.findByIdAndUpdate(user._id, { token });
        res.json({
            status: "success",
            code: 200,
            token,
            user: {
                email,
            }
        })
        
    } catch (error) {
        next(error);
    }
}


module.exports = login;