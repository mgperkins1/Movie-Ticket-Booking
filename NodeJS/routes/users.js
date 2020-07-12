const { User, validate } = require("../models/user");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    const users = await User.find().sort("name");

    if (!users) return res.status(404).send("Users not found.");

    res.send(users);
});

router.post("/", async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    await user.save();

    res.send(user);
});

module.exports = router;
