const express = require("express");
const movieModel = require("../models/movie");
const router = express.Router();

router.get("/", function (req, res) {
  movieModel
    .find({ status: req.query.status })
    .limit(parseInt(req.query.limit))
    .sort("-" + req.query.sort_by)
    .select({ _id: 1, poster_path: 1 })
    // .select("_id", "poster_path")
    .then(function (movies) {
      res.json(movies);
      // console.log("ok");
    });
});

router.get("/default", function (req, res) {
  movieModel
    .find({ status: "Released" })
    .limit(20)
    .sort("-popularity")
    // .select("_id", "poster_path")
    .then(function (movies) {
      res.json(movies);
      // console.log("ok");
    });
});

router.get("/movie/", function (req, res) {
  console.log(req.query);
  movieModel.findOne({ _id: req.query.id }).then(function (movie) {
    res.json(movie);
    // console.log("ok");
  });
});

router.get("/genre/", function (req, res) {
  // console.log(req.query);
  movieModel
    .find({ "genres.name": req.query.name })
    .limit(parseInt(req.query.limit))
    .sort("-vote_count")
    .select({ _id: 1, poster_path: 1 })
    .then(function (movies) {
      res.json(movies);
      // console.log(movies);
    });
});

router.get("/search", function (req, res) {
  movieModel
    .find({
      $or: [
        { name: { $regex: new RegExp(req.query.name, "i") } },
        { overview: { $regex: new RegExp(req.query.name, "i") } },
        { genres: { $regex: new RegExp(req.query.name, "i") } },
        { "credits.cast.name": { $regex: new RegExp(req.query.name, "i") } },
        {
          "credits.cast.character": { $regex: new RegExp(req.query.name, "i") },
        },
        { "credits.crew.name": { $regex: new RegExp(req.query.name, "i") } },
      ],
    })
    .limit(20)
    .sort("-popularity")
    .then(function (movies) {
      // console.log(movies);
      res.json(movies);
      // console.log("ok");
    });
});

router.post("/new", function (req, res) {
  res.send("POST bien reçu");
  // console.log(req.body);

  const newMovie = new movieModel({
    name: req.body.name,
    release_date: req.body.release_date,
  });

  newMovie.save().then(function (newDocument) {
    res.status(201).json(newDocument);
  });
});

module.exports = router;
