//Imports
import express from "express";

//SetUp
const app = express();
const PORT = 3000 || 3001;

//Middleware
app.use(express.json());

// Routes

// Error handling middleware
app.use((req, res, next) => {
    next(error(404, "Resource Not Found"));
  });

//Listen
app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
  });