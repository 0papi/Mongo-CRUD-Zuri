const express = require("express");
const mongoose = require("mongoose");
const todoRoutes = require("./routes/todoRoutes");
const app = express();

// set up mongo connect
const connectDB = async () => {
  try {
    const connect = await mongoose.connect(
      "mongodb+srv://evans:merntrial123@merncluseter.ckg8p.mongodb.net/mernapp?retryWrites=true&w=majority"
    );
    console.log("Mongo server started");
  } catch (error) {
    console.log(error);
  }
};

// invoke mongo server creator function
connectDB();

// invoke some middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// create some routes

app.use("/", todoRoutes);

app.listen(3000, () => {
  console.log("Serving running");
});
