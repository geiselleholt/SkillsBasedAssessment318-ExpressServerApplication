import express from "express";
import batmanMovies from "../data/batmanMovies.mjs";
import villans from "../data/villans.mjs";
import error from "../utilities/error.mjs";

const router = express.Router();

// @desc: Get ALL batmanMovies
// @path: /api/batmanMovie
// @access: Public
router
  .route("/")
  .get((req, res) => {
    res.json(batmanMovies);
  })
  // @desc: Create A batmanMovie
  // @path: /api/batmanMovie
  // @access: Public
  .post((req, res) => {
    if (req.body.title && req.body.year && req.body.bruceWayne) {
      if (batmanMovies.find((batmanMovie) => batmanMovie.title == req.body.title)) {
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
  // @path: /api/batmanMovie/:id
  // @access: Public
  .get((req, res, next) => {
    const batmanMovie = batmanMovies.find((batmanMovie) => batmanMovie.id == req.params.id);

    if (batmanMovie) res.json(batmanMovie);
    else next();
  })
  // @desc: Update ONE batmanMovie
  // @path: /api/batmanMovie/:id
  // @access: Public
  .patch((req, res, next) => {
    const batmanMovie = batmanMovies.find((batmanMovie, i) => {
      if (batmanMovie.id == req.params.id) {
        for (const key in req.body) {
          batmanMovies[i][key] = req.body[key];
        }
        return true;
      }
    });

    if (batmanMovie) res.json(batmanMovie);
    else next();
  })
  // @desc: Delete ONE batmanMovie
  // @path: /api/batmanMovie/:id
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

router
  .route("/:id/villans")
  // @desc: Get all villans in a batmanMovie
  // @path: /api/batmanMovie/:id/villan
  // @access: Public
  .get((req, res, next) => {
    const batmanMovie = batmanMovies.find(
      (batmanMovie) => batmanMovie.id == req.params.id
    );
    let batmanMovieVillans = [];

    villans.forEach((villan) => {
      if (villan.batmanMovieId == batmanMovie.id) {
        batmanMovieVillans.push(villan);
      }
    });

    if (batmanMovieVillans.length > 0) res.json(batmanMovieVillans);
    else next(error(400, "No Matching Villans"));
  })
  // @desc: Delete all villans in a batmanMovie
  // @path: /api/batmanMovie/:id/villan
  // @access: Public
  .delete((req, res, next) => {
    const batmanMovie = batmanMovies.find(
      (batmanMovie) => batmanMovie.id == req.params.id
    );
    let batmanMovieVillans = [];

    villans.forEach((villan) => {
      if (villan.batmanMovieId == batmanMovie.id) {
        batmanMovieVillans.push(villan);
        let index = villans.indexOf(villan);
        villans.splice(index, 1);
      }
    });
    if (batmanMovieVillans.length > 0) res.json(batmanMovieVillans);
    else next();
  });

export default router;
