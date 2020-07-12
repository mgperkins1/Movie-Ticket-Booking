const { Movie, validate } = require("../models/movie");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    const movies = await Movie.find();

    if (!movies) return res.status(404).send(`No movies found.`);

    res.send(movies);
});

router.get("/:param", async (req, res) => {
    if (req.params.param.length === 24) {
        const movie = await Movie.findById(req.params.param).lean();

        if (!movie) return res.status(404).send("The movie with the given ID could not be found.");

        res.send(movie);
    } else {
        const movies = await Movie.find({ city: req.params.param }).lean();

        if (!movies) return res.status(404).send("No movies found for the given city.");

        res.send(movies);
    }
});

router.post("/", async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const movie = new Movie({
        name: req.body.name,
        language: req.body.language,
        format: req.body.format,
        rating: req.body.rating,
        imgSrc: req.body.imgSrc,
        city: req.body.city
    });

    await movie.save();

    res.send(movie);
});

module.exports = router;
