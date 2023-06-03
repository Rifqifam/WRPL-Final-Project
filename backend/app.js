const express = require("express");
const cors = require("cors");
const app = express();

const errorMiddleWare = require("./middlewares/errors");

app.use(express.json());
app.use(cors());

// IMPORT ALL ROUTES
const products = require("./routes/product");
const carts = require("./routes/userCart");
const fav = require("./routes/favorites");

app.use("/wrpl-database/", products);
app.use("/wrpl-database/", carts);
app.use("/wrpl-database", fav);

// Middleware to handle erros
app.use(errorMiddleWare);

module.exports = app;
