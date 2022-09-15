const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose
  .connect("mongodb://value:value@mongo:27017/?authSource=admin")
  .then(() => console.log("successfully connected to db"))
  .catch((e) => console.log(e));

app.get("/", (req, res) => {
  res.send("<h2>Hey Ramsey!</h2>");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log("listen of PORT: ", PORT));
