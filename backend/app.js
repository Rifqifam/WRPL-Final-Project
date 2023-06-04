const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const errorMiddleWare = require("./middlewares/errors");

app.use(express.json());
app.use(cors());
// app.use(bodyParser.json());

// IMPORT ALL ROUTES
const products = require("./routes/product");
const carts = require("./routes/userCart");
const fav = require("./routes/favorites");
const payment = require("./routes/payment");

app.use("/wrpl-database/", products);
app.use("/wrpl-database/", carts);
app.use("/wrpl-database", fav);
app.use("/wrpl-database", payment);

// Middleware to handle erros
app.use(errorMiddleWare);

module.exports = app;
