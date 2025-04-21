//Imports
import express from "express";
import batmanMovieRoutes from "./routes/batmanMovieRoutes.mjs";
import villanRoutes from "./routes/villanRoutes.mjs";
import reviewRoutes from "./routes/reviewRoutes.mjs";
import error from "./utilities/error.mjs";
import requestLog from "./utilities/requestLog.mjs";


//SetUp
const app = express();
const PORT = 3000 || 3001;

//Middleware
app.use(express.json());
app.use(requestLog);

// Routes
app.use("/api/batmanMovies", batmanMovieRoutes);
app.use("/api/villans", villanRoutes);
app.use("/api/reviews", reviewRoutes);

// HATEOAS links to adhere to the guiding principles of REST
app.get("/api", (req, res) => {
  res.json({
    links: [
      {
        href: "api/batmanMovies",
        rel: "batmanMovies",
        type: "GET",
      },
      {
        href: "api/batmanMovies",
        rel: "batmanMovies",
        type: "POST",
      },
      {
        href: "api/reviews",
        rel: "reviews",
        type: "GET",
      },
      {
        href: "api/reviews",
        rel: "reviews",
        type: "POST",
      },
      {
        href: "api/villans",
        rel: "villans",
        type: "GET",
      },
      {
        href: "api/villans",
        rel: "villans",
        type: "POST",
      },
    ],
  });
});

// Error handling middleware
app.use((req, res, next) => {
    next(error(404, "Resource Not Found"));
  });

//Listen
app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
  });