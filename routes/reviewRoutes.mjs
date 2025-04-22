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
    const { batmanMoviesTitle, rating, review } = req.query;

    let query = [...reviews];

    if (batmanMoviesTitle) {
      query = query.filter((review) =>
        review.batmanMoviesTitle.includes(batmanMoviesTitle)
      );
    }
    if (rating) {
      query = query.filter((review) => Number(review.rating) === Number(rating));
    }
    if (review) {
      query = query.filter((review) => review.review.includes(review));
    }

    res.json(query);
  })
  // @desc: Create A review
  // @path: /api/reviews
  // @access: Public
  .post((req, res, next) => {
    if (req.body.batmanMoviesId && req.body.rating && req.body.review) {
      if (reviews.find((review) => review.id == req.body.id)) {
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
    } else next(error(404, "Missing Data or Data Entered Incorrectly"));
  });

router
  .route("/:id")
  // @desc: Get ONE review
  // @path: /api/review/:id
  // @access: Public
  .get((req, res, next) => {
    const review = reviews.find((review) => review.id == req.params.id);

    if (review) res.json(review);
    else next(error(404, "No Review With That Id Number"));
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
    else next(error(404, "Missing Data or Data Entered Incorrectly"));
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
