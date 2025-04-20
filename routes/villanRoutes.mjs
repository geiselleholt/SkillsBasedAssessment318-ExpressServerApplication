import express from "express";
import villans from "../data/villans.mjs";
import batmanMovies from "../data/batmanMovies.mjs";
import error from "../utilities/error.mjs";

const router = express.Router();

// @desc: Get ALL villans
// @path: /api/villan
// @access: Public
router
  .route("/")
  .get((req, res) => {
    res.json(villans);
  })
  .post((req, res) => {
    if (req.body.batmanMoviesId && req.body.name && req.body.actor) {
      if (villans.find((batmanMoviesId) => batmanMoviesId.name == req.body.name)) {
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
    } else next(error(409, "name Already Taken"));
  });

router
  .route("/:id")
  // @desc: Get ONE villan
  // @path: /api/villan/:id
  // @access: Public
  .get((req, res, next) => {
    const villan = villans.find((batmanMoviesId) => batmanMoviesId.id == req.params.id);

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

  export default router;