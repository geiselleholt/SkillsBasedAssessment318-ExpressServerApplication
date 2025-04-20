//Imports
import express from "express";
import batmanMovieRoutes from "./routes/batmanMovieRoutes.mjs";
import villanRoutes from "./routes/villanRoutes.mjs";
import reviewRoutes from "./routes/reviewRoutes.mjs";
import error from "./utilities/error.mjs";


//SetUp
const app = express();
const PORT = 3000 || 3001;

//Middleware
app.use(express.json());

// Routes
app.use("/api/batmanMovies", batmanMovieRoutes);
app.use("/api/villan", villanRoutes);
app.use("/api/review", reviewRoutes);

// Error handling middleware
app.use((req, res, next) => {
    next(error(404, "Resource Not Found"));
  });

//Listen
app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
  });