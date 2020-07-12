const mongoose = require("mongoose");
const Joi = require("joi");

const theaterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 255
    },
    city: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 255
    },
    movies: [
        new mongoose.Schema({
            movie: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Movie"
            },
            dates: {
                type: [Date],
                required: true
            },
            times: {
                type: [String],
                required: true
            },
            price: {
                type: Number,
                required: true,
                min: 0,
                max: 20.00
            }
        })
    ]
});

const Theater = mongoose.model("Theater", theaterSchema);

function validateTheater(theater) {
    const theaterSchema = Joi.object({
        name: Joi.string()
            .required()
            .min(1)
            .max(255),

        city: Joi.string()
            .required()
            .min(1)
            .max(255),

        movies: Joi.array().items(
            Joi.object({
                movie: Joi.objectId()
                    .required(),

                dates: Joi.array().items(
                    Joi.date()
                        .required()
                ),
                times: Joi.array().items(
                    Joi.string()
                        .required()
                ),
                price: Joi.number()
                    .required()
                    .min(0)
                    .max(20.00)
            })
        )
    })

    return Joi.validate(theater, theaterSchema);
}

exports.Theater = Theater;
exports.validate = validateTheater;