import express from "express";
const app = express();

export default app.get("/", (req, res) => {
    const options = {
      title: "Batman Movies Data",
      content:
        "Enter a Batman movie title",
    };
    res.render("home", options);
  });