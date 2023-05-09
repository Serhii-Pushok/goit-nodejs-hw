const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new Schema({
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    token: {
        type: String,
        default: null,
    }
}, { versionKey: false, timestamps: true });

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

userSchema.post('save', (error, data, next) => {
    error.status = 400;
    next();
})

const User = model('user', userSchema);


module.exports = User;