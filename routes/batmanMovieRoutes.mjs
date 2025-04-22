import express from "express";
import batmanMovies from "../data/batmanMovies.mjs";
import error from "../utilities/error.mjs";

const router = express.Router();

router
  .route("/")
  // @desc: Get ALL batmanMovies
  // @path: /api/batmanMovies
  // @access: Public
  .get((req, res) => {
    const { title, year, bruceWayne } = req.query;

    let query = [...batmanMovies];

    if (title) {
      query = query.filter((movie) =>
        movie.title.includes(title)
      );
    }
    if (year) {
      query = query.filter((movie) => movie.year === year);
    }
    if (bruceWayne) {
      query = query.filter((movie) =>
        movie.bruceWayne.includes(bruceWayne)
      );
    }

    res.json(query);
  })
  // @desc: Create A batmanMovie
  // @path: /api/batmanMovies
  // @access: Public
  .post((req, res, next) => {
    if (req.body.title && req.body.year && req.body.bruceWayne) {
      if (
        batmanMovies.find((batmanMovie) => batmanMovie.title == req.body.title)
      ) {
        next(error(409, "Movie Title Already Added"));
        return;
      }

      const batmanMovie = {
        id: batmanMovies[batmanMovies.length - 1].id + 1,
        title: req.body.title,
        year: req.body.year,
        bruceWayne: req.body.bruceWayne,
      };

      batmanMovies.push(batmanMovie);
      res.json(batmanMovies[batmanMovies.length - 1]);
    } else next(error(409, "Movie Title Already Added"));
  });

router
  .route("/:id")
  // @desc: Get ONE batmanMovie
  // @path: /api/batmanMovies/:id
  // @access: Public
  .get((req, res, next) => {
    const batmanMovie = batmanMovies.find(
      (batmanMovie) => batmanMovie.id == req.params.id
    );

    if (batmanMovie) res.json(batmanMovie);
    else next(error(404, "No Movie For That ID Number"));
  })
  // @desc: Update ONE batmanMovie
  // @path: /api/batmanMovies/:id
  // @access: Public
  .patch((req, res, next) => {
    const movieIndex = batmanMovies.findIndex(
      (batmanMovie) => batmanMovie.id == req.params.id
    );

    if (movieIndex === -1) {
      return next(error(404, "No Movie Found For That ID Number"));
    }

    // Update the movie with the new data
    const updatedMovie = { ...batmanMovies[movieIndex], ...req.body };
    batmanMovies[movieIndex] = updatedMovie;

    res.json(updatedMovie);
  })
  // @desc: Delete ONE batmanMovie
  // @path: /api/batmanMovies/:id
  // @access: Public
  .delete((req, res, next) => {
    const batmanMovie = batmanMovies.find((batmanMovie, i) => {
      if (batmanMovie.id == req.params.id) {
        batmanMovies.splice(i, 1);
        return true;
      }
    });

    if (batmanMovie) res.json(batmanMovie);
    else next();
  });

export default router;
