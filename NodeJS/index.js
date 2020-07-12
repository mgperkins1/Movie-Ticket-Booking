const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const users = require("./routes/users");
const movies = require("./routes/movies");
const cities = require("./routes/cities");
const theaters = require("./routes/theaters");

mongoose
    .connect("mongodb://localhost/movieTicketBooking")
    .then(() => console.log("Connected to MongoDB..."))
    .catch(err => console.log("Could not connect to MongoDB", err));

app.use(express.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use("/api/users", users);
app.use("/api/movies", movies);
app.use("/api/cities", cities);
app.use("/api/theaters", theaters);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));