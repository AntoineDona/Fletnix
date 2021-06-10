const movieModel = require("./models/movie");

movieModel
  .find({})
  .limit(20)
  .sort("-vote_average")
  .select(
    "name release_date original_language overview poster_path status vote_average vote_count"
  );
