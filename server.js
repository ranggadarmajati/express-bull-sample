require('dotenv').config();
const express = require("express");
var cors = require('cors');
const app = express();

const port = process.env.PORT || 5000;

app.use(cors());

app.get("/healthcheck", (req, res) => {
  return res.status(200).send({
    type: "healthcheck",
    message: "ok",
  });
});

app.listen(port, () => {
  console.log("Listening on " + port);
});

module.exports = app;