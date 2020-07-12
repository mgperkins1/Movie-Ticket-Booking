const mongoose = require("mongoose");
const Joi = require("joi");

const Movie = mongoose.model("Movie", new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50
    },
    language: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50
    },
    format: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 2
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    imgSrc: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50
    },
    city: {
        type: String,
        require: true,
        minlength: 1,
        maxlength: 50
    }
}));

function validateMovie(movie) {
    const schema = {
        name: Joi.string().required().min(1).max(50),
        language: Joi.string().required().min(1).max(50),
        format: Joi.string().required().min(2).max(2),
        rating: Joi.number().required().min(1).max(5),
        imgSrc: Joi.string().required().min(1).max(50),
        city: Joi.string().required().min(1).max(50)
    }

    return Joi.validate(movie, schema);
};

exports.Movie = Movie;
exports.validate = validateMovie;