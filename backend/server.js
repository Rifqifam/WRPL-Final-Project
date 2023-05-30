const app = require("./app");
const connectDatabase = require("./config/database");

const dotenv = require("dotenv");

// SETTING UP CONFIG FILE
dotenv.config({ path: "backend/config/config.env" });

// CONNECT TO DATABASE
connectDatabase();

app.listen(process.env.PORT, () => {
   console.log(
      "Server Started On Port :  " +
         process.env.PORT +
         " on " +
         process.env.NODE_ENV +
         " mode"
   );
});
