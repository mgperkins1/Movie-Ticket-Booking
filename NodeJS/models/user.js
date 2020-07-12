const mongoose = require("mongoose");
const Joi = require("joi");

const User = mongoose.model("User", new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 50
    },
    password: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 15
    }
}));

function validateUser(user) {
    const schema = {
        username: Joi.string().required().min(4).max(50),
        password: Joi.string().required().min(4).max(50)
    };

    return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;