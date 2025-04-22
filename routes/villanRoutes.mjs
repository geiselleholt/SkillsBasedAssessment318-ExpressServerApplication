import express from "express";
import villans from "../data/villans.mjs";
import error from "../utilities/error.mjs";
import chalk from "chalk";

const router = express.Router();

router
  .route("/")
  // @desc: Get ALL villans
  // @path: /api/villans
  // @access: Public
  .get((req, res) => {
    const { batmanMoviesTitle, name, actor } = req.query;

    let query = [...villans];

    if (batmanMoviesTitle) {
      query = query.filter((villan) =>
        villan.batmanMoviesTitle.includes(batmanMoviesTitle)
      );
    }
    if (name) {
      query = query.filter((villan) => villan.name.includes(name));
    }
    if (actor) {
      query = query.filter((villan) => villan.actor.includes(actor));
    }

    res.json(query);
  })
  // @desc: Create a villan
  // @path: /api/villans
  // @access: Public
  .post((req, res, next) => {
    if (
      req.body.batmanMoviesId &&
      req.body.batmanMoviesTitle &&
      req.body.name &&
      req.body.actor
    ) {
      if (villans.find((villan) => villan.name == req.body.name)) {
        next(chalk.red(error(409, "Villan Already Created")));
        return;
      }

      const villan = {
        id: villans[villans.length - 1].id + 1,
        batmanMoviesId: req.body.batmanMoviesId,
        batmanMoviesTitle: req.body.batmanMoviesTitle,
        name: req.body.name,
        actor: req.body.actor,
      };

      villans.push(villan);
      res.json(villans[villans.length - 1]);
    } else
      next(
        chalk.blue.bold(error(404, "Missing Data or Data Entered Incorrectly"))
      );
  });

router
  .route("/:id")
  // @desc: Get ONE villan
  // @path: /api/villans/:id
  // @access: Public
  .get((req, res, next) => {
    const villan = villans.find(
      (batmanMoviesId) => batmanMoviesId.id == req.params.id
    );

    if (villan) res.json(villan);
    else next();
  })
  // @desc: Update a villan
  // @path: /api/villans/:id
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
    else next(chalk.red(error(400, "No Villans with this ID Number")));
  })
  // @desc: Delete a villan
  // @path: /api/villans/:id
  // @access: Public
  .delete((req, res, next) => {
    const villan = villans.find((batmanMoviesId, i) => {
      if (batmanMoviesId.id == req.params.id) {
        villans.splice(i, 1);
        return true;
      }
    });

    if (villan) res.json(villan);
    else next(chalk.blue(error(400, "No Villans with this ID Number")));
  });

router
  .route("/batmanMoviesTitle/:title")
  // @desc: Get all villans from a batmanMovie by title
  // @path: /api/villans/batmanMoviesTitle/:title
  // @access: Public
  .get((req, res, next) => {
    let batmanMovieVillans = [];

    villans.forEach((villan) => {
      if (villan.batmanMoviesTitle == req.params.batmanMoviesTitle) {
        batmanMovieVillans.push(villan);
      }
    });

    if (batmanMovieVillans.length > 0) res.json(batmanMovieVillans);
    else next(chalk.red(error(404, "Batman Movie Title Not Found")));
  })
  // @desc: Delete all villans from a batmanMovie by title
  // @path: /api/villans/batmanMovieTitle/:title
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
