const { Unauthorized } = require('http-errors');
const User = require('../../models/user');


const getCurrent = async (req, res, next) => {
    try {
        const { email, subscription } = req.user;
        const user = await User.findOne({ email });
        if (!user) {
             throw new Unauthorized('Not authorized');
        }
        res.json({
            status: "success",
            code: 200,
            user: {
                email,
                subscription
            }
        })

    } catch (error) {
         next(error);
    }
}


module.exports = getCurrent;