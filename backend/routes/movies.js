const express = require("express");
const movieModel = require("../models/movie");
const router = express.Router();

router.get("/", function (req, res) {
  console.log(req.query);
  movieModel
    .find({})
    .limit(parseInt(req.query.limit))
    .sort("-" + req.query.sort_by)
    .then(function (movies) {
      res.json(movies);
      console.log("ok");
    });
});

router.get("/movie/", function (req, res) {
  console.log(req.query);
  movieModel.findOne({ _id: req.query.id }).then(function (movie) {
    res.json(movie);
    console.log("ok");
  });
});

router.get("/genre/", function (req, res) {
  console.log(req.query);
  movieModel
    .find({ "genres.name": req.query.name })
    .limit(parseInt(req.query.limit))
    .sort("-vote_count")

    .then(function (movies) {
      res.json(movies);
      console.log(movies);
    });
});

router.post("/new", function (req, res) {
  res.send("POST bien reçu");
  console.log(req.body);

  const newMovie = new movieModel({
    name: req.body.name,
    release_date: req.body.release_date,
  });

  newMovie.save().then(function (newDocument) {
    res.status(201).json(newDocument);
  });
});

module.exports = router;
