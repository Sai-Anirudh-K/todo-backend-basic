const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

const todoRouter = require("./routes/todo.routes");
app.use("/todos", todoRouter);
const mongoURI = process.env.MONGODB_URI;
const PORT = process.env.PORT;

async function connectDB() {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log("Server running on " + PORT);
    });
  } catch (error) {
    console.error("Database Connection failed ", error.message);
    process.exit(1);
  }
}

connectDB();
