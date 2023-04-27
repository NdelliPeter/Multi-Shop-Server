const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

app.get("/", function (req, res) {
  res.send("I am Peter \n Hello World!");
});

app.get("/api", (req, res) => {
  res.json({"account" : [{
    "firstName": "Ndelli",
    "lastName": "Peter",
    "userName": "bluesky",
    "email": "ndellipetex@gmail.com"
  }]});
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
