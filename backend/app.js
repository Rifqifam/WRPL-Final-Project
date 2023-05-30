const express = require("express");
const app = express();

const errorMiddleWare = require("./middlewares/errors");

app.use(express.json());

// IMPORT ALL ROUTES
const products = require("./routes/product");

app.use("/wrpl-database/", products);

// Middleware to handle erros
app.use(errorMiddleWare);

module.exports = app;
