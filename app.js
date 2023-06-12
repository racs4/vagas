import express from "express";
import bodyParser from "body-parser";
import userRoutes from "./src/users/users.routes.js";
var app = express();

// var teste1 = require("./teste1");
// var teste2 = require("./teste2");
// var teste3 = require("./teste3");
// var teste4 = require("./teste4");
// var teste5 = require("./teste5");

app.set("view engine", "jade");

app.use(express.json());
app.use(express.urlencoded());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(userRoutes);

app.get("/", function (req, res) {
  res.send(`get users/:id </br>
  get users/ </br>
  post users/ </br>
  delete users/:id </br>
  put users/:id </br>
  get users/:id/access </br>
  put users/:id/permission </br>
  please read the readme.md file for more information, <a href="https://github.com/racs4/vagas">https://github.com/racs4/vagas</a>
  `);
});

const port = 3000;
app.listen(port, function () {
  console.log("Express server listening on port " + port);
});
