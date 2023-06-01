const express = require("express");
const cors = require("cors");
const app = express();

const errorMiddleWare = require("./middlewares/errors");

app.use(express.json());
app.use(cors());

// IMPORT ALL ROUTES
const products = require("./routes/product");
const carts = require("./routes/userCart");

app.use("/wrpl-database/", products);
app.use("/wrpl-database/", carts);

// Middleware to handle erros
app.use(errorMiddleWare);

module.exports = app;
