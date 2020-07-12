const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Theater, validate } = require("../models/theater");
const { Movie } = require("../models/movie");

router.get("/", async (req, res) => {
    const theaters = await Theater.find()
        .populate("movies.movie");

    if (!theaters) return res.status(404).send(`No theaters found.`);

    res.send(theaters);
});

router.get("/:city", async (req, res) => {
    const theaters = await Theater.find({ city: req.params.city }).populate("movies.movie").lean();

    if (!theater) return res.status(404).send("The theater with the given ID could not be found.");

    res.send(theater);
});

router.post("/", async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const theater = new Theater({
        name: req.body.name,
        movies: req.body.movies,
    });

    await theater.save();

    res.send(theater);
});

module.exports = router;
