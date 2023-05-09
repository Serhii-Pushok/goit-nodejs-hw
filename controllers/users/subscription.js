const { NotFound } = require('http-errors');
const { BadRequest } = require('http-errors');
const User = require('../../models/user');
const { subscriptionSchema } = require('../../schemas');


const subscription = async (req, res, next) => {
    try {
        const { error } = subscriptionSchema.validate(req.body);
        if (error) {
            error.status = 400;
            error.message = "missing field";
            throw error;
        }
        const { _id } = req.user;
        const { subscription } = req.body;
        if (subscription !== 'starter' && subscription !== 'pro' && subscription !== 'business') {
            throw new BadRequest("Wrong field subscription");
        }
        const result = await User.findByIdAndUpdate(_id, { subscription }, {new: true});
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
}


module.exports = subscription;