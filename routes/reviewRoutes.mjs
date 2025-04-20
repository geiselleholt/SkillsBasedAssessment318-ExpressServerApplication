import express from "express";
import users from "../data/users.mjs";
import posts from "../data/posts.mjs";
import error from "../utilities/error.mjs";

const router = express.Router();

// @desc: Get All Users
// @path: /api/user
// @access: Public
router
  .route("/")
  .get((req, res) => {
    res.json(users);
  })
  .post((req, res) => {
    if (req.body.name && req.body.username && req.body.email) {
      if (users.find((u) => u.username == req.body.username)) {
        next(error(409, "Username Already Taken"));
        return;
      }

      const user = {
        id: users[users.length - 1].id + 1,
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
      };

      users.push(user);
      res.json(users[users.length - 1]);
    } else next(error(409, "Username Already Taken"));
  });

// @desc: Get ONE Users
// @path: /api/user/:id
// @access: Public
router
  .route("/:id")
  .get((req, res, next) => {
    const user = users.find((u) => u.id == req.params.id);

    if (user) res.json(user);
    else next();
  })
  .patch((req, res, next) => {
    const user = users.find((u, i) => {
      if (u.id == req.params.id) {
        for (const key in req.body) {
          users[i][key] = req.body[key];
        }
        return true;
      }
    });

    if (user) res.json(user);
    else next();
  })
  .delete((req, res, next) => {
    const user = users.find((u, i) => {
      if (u.id == req.params.id) {
        users.splice(i, 1);
        return true;
      }
    });

    if (user) res.json(user);
    else next();
  });

//GET /api/users/:id/posts  also added a DELETE route
router
  .route("/:id/posts")
  .get((req, res, next) => {
    const user = users.find((user) => user.id == req.params.id);
    let userPosts = [];

    posts.forEach((post) => {
      if (post.userId == user.id) {
        userPosts.push(post);
      }
    });

    if (userPosts.length > 0) res.json(userPosts);
    else next(error(400, "No matching Posts"));
  })
  .delete((req, res, next) => {
    const user = users.find((user) => user.id == req.params.id);
    let userPosts = [];

    posts.forEach((post) => {
      if (post.userId == user.id) {
        userPosts.push(post);
        let index = posts.indexOf(post);
        posts.splice(index, 1);
      }
    });
    if (userPosts.length > 0) res.json(userPosts);
    else next();
  });


export default router;
