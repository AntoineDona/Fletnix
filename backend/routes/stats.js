const express = require("express");
const statModel = require("../models/stats");
const router = express.Router();

router.get("/", function (req, res) {
  console.log(req.query.like);
  statModel
    .findOne({ movie_id: req.query.movie_id, user_id: "Antoinedo" })
    .then(function (liked) {
      res.json(liked);
      // console.log(liked);
    });
});

router.post("/like", function (req, res) {
  console.log("holz");
  statModel.findOne({ movie_id: req.query.movie_id }).then(function (liked) {
    console.log("hiuhuohh", liked);
    if (liked == null) {
      const newStat = new statModel({
        movie_id: req.query.movie_id,
        user_id: "Antoinedo",
        like: req.query.like,
      });


      newStat.save().then(() => {
        res.json("ok");
      });
    } else {
      liked
        .update({
          like: req.query.like,
        })
        .then(() => {
          res.json("ok");
        });
    }
  });
});

module.exports = router;
