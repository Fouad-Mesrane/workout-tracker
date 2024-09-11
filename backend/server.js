require("dotenv").config();
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workouts");
const express = require("express");
// allow frontend requests using cors
const cors = require('cors');


//express app
const app = express();

//middleware
app.use(express.json());


app.use(cors({
  origin: 'http://localhost:5173'  // Allow your Vite frontend
}));

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/api/workouts", workoutRoutes);

//connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("Connected to DB & Listening on port", process.env.PORT);
    });
  })
  .catch((e) => {
    console.log(e);
  });
