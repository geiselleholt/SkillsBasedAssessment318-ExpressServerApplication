import express from "express";
import reviews from "../data/reviews.mjs";
import error from "../utilities/error.mjs";

const router = express.Router();

router
  .route("/")
  // @desc: Get ALL reviews
  // @path: /api/reviews
  // @access: Public
  .get((req, res) => {
    res.json(reviews);
  })
  // @desc: Create A review
  // @path: /api/reviews
  // @access: Public
  .post((req, res, next) => {
    if (req.body.id && req.body.batmanMoviesId && req.body.rating && req.body.review) {
      if (
        reviews.find(
          (review) => review.id == req.body.id
        )
      ) {
        next(error(400, "Review Already Exists"));
        return;
      }

      const review = {
        id: reviews[reviews.length - 1].id + 1,
        batmanMoviesId: req.body.batmanMoviesId,
        rating: req.body.rating,
        review: req.body.review,
      };

      reviews.push(review);
      res.json(reviews[reviews.length - 1]);
    } else next(error(409, "Review Already Exists"));
  });

router
  .route("/:id")
  // @desc: Get ONE review
  // @path: /api/review/:id
  // @access: Public
  .get((req, res, next) => {
    const review = reviews.find((review) => review.id == req.params.id);

    if (review) res.json(review);
    else next();
  })
  // @desc: Update ONE review
  // @path: /api/review/:id
  // @access: Public
  .patch((req, res, next) => {
    const review = reviews.find((review, i) => {
      if (review.id == req.params.id) {
        for (const key in req.body) {
          reviews[i][key] = req.body[key];
        }
        return true;
      }
    });

    if (review) res.json(review);
    else next();
  })
  // @desc: Delete ONE review
  // @path: /api/review/:id
  // @access: Public
  .delete((req, res, next) => {
    const review = reviews.find((review, i) => {
      if (review.id == req.params.id) {
        reviews.splice(i, 1);
        return true;
      }
    });

    if (review) res.json(review);
    else next();
  });

export default router;
