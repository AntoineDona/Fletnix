const express = require("express");
const movieModel = require("../models/movie");
const router = express.Router();

router.get("/", function (req, res) {
  movieModel.find({}).then(function (movies) {
    res.json({ test: movies });
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
