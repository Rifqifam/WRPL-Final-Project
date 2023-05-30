const express = require("express");
const cors = require("cors");
const app = express();

const errorMiddleWare = require("./middlewares/errors");

app.use(express.json());
app.use(cors());

// IMPORT ALL ROUTES
const products = require("./routes/product");

app.use("/wrpl-database/", products);

// Middleware to handle erros
app.use(errorMiddleWare);

module.exports = app;
