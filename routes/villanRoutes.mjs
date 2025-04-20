import express from "express";
import villans from "../data/villans.mjs";
import batmanMovies from "../data/batmanMovies.mjs";
import error from "../utilities/error.mjs";

const router = express.Router();

// @desc: Get All villans
// @path: /api/villan
// @access: Public
router
  .route("/")
  .get((req, res) => {
    res.json(villans);
  })
  .post((req, res) => {
    if (req.body.batmanMoviesId && req.body.name && req.body.actor) {
      if (villans.find((u) => u.name == req.body.name)) {
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

// @desc: Get ONE villan
// @path: /api/villan/:id
// @access: Public
router
  .route("/:id")
  .get((req, res, next) => {
    const villan = villans.find((u) => u.id == req.params.id);

    if (villan) res.json(villan);
    else next();
  })
  .patch((req, res, next) => {
    const villan = villans.find((u, i) => {
      if (u.id == req.params.id) {
        for (const key in req.body) {
          villans[i][key] = req.body[key];
        }
        return true;
      }
    });

    if (villan) res.json(villan);
    else next();
  })
  .delete((req, res, next) => {
    const villan = villans.find((u, i) => {
      if (u.id == req.params.id) {
        villans.splice(i, 1);
        return true;
      }
    });

    if (villan) res.json(villan);
    else next();
  });

//GET /api/villans/:id/batmanMovies  also added a DELETE route
router
  .route("/:id/batmanMovies")
  .get((req, res, next) => {
    const villan = villans.find((villan) => villan.id == req.params.id);
    let villanbatmanMovies = [];

    batmanMovies.forEach((post) => {
      if (post.villanId == villan.id) {
        villanbatmanMovies.push(post);
      }
    });

    if (villanbatmanMovies.length > 0) res.json(villanbatmanMovies);
    else next(error(400, "No matching Batman Movies"));
  })
  .delete((req, res, next) => {
    const villan = villans.find((villan) => villan.id == req.params.id);
    let villanbatmanMovies = [];

    batmanMovies.forEach((post) => {
      if (post.villanId == villan.id) {
        villanbatmanMovies.push(post);
        let index = batmanMovies.indexOf(post);
        batmanMovies.splice(index, 1);
      }
    });
    if (villanbatmanMovies.length > 0) res.json(villanbatmanMovies);
    else next();
  });


export default router;
