const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
const playersRoute = require("./src/routes/players");
const gamesRoute = require("./src/routes/games");

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let port = process.env.PORT;
const dataBaseUrl = process.env.DB_URL;

mongoose
  .connect(dataBaseUrl, {
    useNewUrlParser: true,
  })
  .then(() => console.log("mongoDb Is Connected"))
  .catch((err) => console.log(err));

app.use("/", playersRoute);
app.use("/", gamesRoute);


app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
