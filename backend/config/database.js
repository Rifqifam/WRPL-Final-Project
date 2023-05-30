const mongoose = require("mongoose");

const connectDatabase = () => {
   mongoose
      .connect(process.env.DB_LOCAL_URL, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
      })
      .then((con) => {
         console.log(
            `MongoDB Database connection established with Host: ${con.connection.host}`
         );
      })
      .catch((err) => {
         console.log(`Error connecting to MongoDB Database: ${err}`);
      });
};

module.exports = connectDatabase;
