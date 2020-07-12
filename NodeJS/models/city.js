const mongoose = require("mongoose");
const Joi = require("joi");

const citySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 255
    },
    theater: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Theater"
    }
});

const City = mongoose.model("City", citySchema);

function validateCity(city) {
    const schema = Joi.object({
        name: Joi.string()
            .required()
            .min(1)
            .max(255),

        theater:
            Joi.objectId().required()
    });

    return Joi.validate(city, schema);
}

exports.City = City;
exports.validate = validateCity;