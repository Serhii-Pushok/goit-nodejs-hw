const User = require('../../models/user');

const logout = async (req, res, next) => {
    try {
        const { _id, email } = req.user;
        const user = await User.findOne({ email });
        if (!user) {
             throw new Unauthorized('Not authorized');
        }

        await User.findByIdAndUpdate(_id, { token: null })
        res.status(204).json()
    } catch (error) {
        next(error);
    }
};


module.exports = logout;