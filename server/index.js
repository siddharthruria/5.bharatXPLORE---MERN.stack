require("dotenv").config();
const express = require("express");
const connectDB= require('./config/connect')

const app = express();

connectDB();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server listening to requests on port ${PORT}`);
});
