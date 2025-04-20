import express from "express";
import villans from "../data/villans.mjs";
import batmanMovies from "../data/batmanMovies.mjs";
import error from "../utilities/error.mjs";

const router = express.Router();

// @desc: Get ALL villans
// @path: /api/villans
// @access: Public
router
  .route("/")
  .get((req, res) => {
    res.json(villans);
  })
  .post((req, res) => {
    if (req.body.batmanMoviesId && req.body.name && req.body.actor) {
      if (
        villans.find((batmanMoviesId) => batmanMoviesId.name == req.body.name)
      ) {
        next(error(409, "name Already Taken"));
        return;
      }

      const villan = {
        id: villans[villans.length - 1].id + 1,
        batmanMoviesId: req.body.batmanMoviesId,
        name: req.body.name,
        actor: req.body.actor,
      };

      villans.push(villan);
      res.json(villans[villans.length - 1]);
    } else next(error(404, "Name Already Taken"));
  });

router
  .route("/:id")
  // @desc: Get ONE villan
  // @path: /api/villan/:id
  // @access: Public
  .get((req, res, next) => {
    const villan = villans.find(
      (batmanMoviesId) => batmanMoviesId.id == req.params.id
    );

    if (villan) res.json(villan);
    else next();
  })
  // @desc: Update a villan
  // @path: /api/villan/:id
  // @access: Public
  .patch((req, res, next) => {
    const villan = villans.find((batmanMoviesId, i) => {
      if (batmanMoviesId.id == req.params.id) {
        for (const key in req.body) {
          villans[i][key] = req.body[key];
        }
        return true;
      }
    });

    if (villan) res.json(villan);
    else next();
  })
  // @desc: Delete a villan
  // @path: /api/villan/:id
  // @access: Public
  .delete((req, res, next) => {
    const villan = villans.find((batmanMoviesId, i) => {
      if (batmanMoviesId.id == req.params.id) {
        villans.splice(i, 1);
        return true;
      }
    });

    if (villan) res.json(villan);
    else next();
  });

router
  .route("/:batmanMoviesTitle")
  // @desc: Get all villans from a batmanMovie by title
  // @path: /api/villans/batmanMoviesTitle
  // @access: Public
  .get((req, res, next) => {
    let batmanMovieVillans = [];

    villans.forEach((villan) => {
      if (villan.batmanMoviesTitle == req.params.batmanMoviesTitle) {
        batmanMovieVillans.push(villan);
      }
    });

    if (batmanMovieVillans.length > 0) res.json(batmanMovieVillans);
    else next(error(400, "No Villans For This Batman Movie"));
  })
  // @desc: Delete all villans from a batmanMovie by title
  // @path: /api/villans/batmanMovieTitle
  // @access: Public
  .delete((req, res, next) => {
    let batmanMovieVillans = [];

    villans.forEach((villan) => {
      if (villan.batmanMoviesTitle == req.params.batmanMoviesTitle) {
        batmanMovieVillans.push(villan);
        let index = villans.indexOf(villan);
        villans.splice(index, 1);
      }
    });
    if (batmanMovieVillans.length > 0) res.json(batmanMovieVillans);
    else next(error(400, "No Villans For This Batman Movie To Delete"));
  });

export default router;
