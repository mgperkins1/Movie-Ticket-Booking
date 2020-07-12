const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { City, validate } = require("../models/city");
const { Theater } = require("../models/theater");

router.get("/", async (req, res) => {
    const cities = await City.find()
        .populate("theater")
        .populate("theater.movies.movie");

    if (!cities) return res.status(404).send("Cities not found.");

    res.send(cities);
});

router.get("/:id", async (req, res) => {
    const theater = Theater.findById(req.params.id)
        .populate("theater")
        .populate("theater.movies.movie");

    if (!theater) return res.status(404).send("The theater with the given ID could not be found.");

    res.send(theater);
});

router.post("/", async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const city = new City({
        name: req.body.name,
        theater: req.body.theater
    });

    await city.save();

    res.send(city);
});

module.exports = router;