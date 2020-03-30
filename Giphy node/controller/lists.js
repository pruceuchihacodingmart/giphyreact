var lists = require("express").Router();
var client = require("../config/config");

lists.get("/", (req, res) => {
    client.query("Select * from tbgiphy", (err, response) => {
      res.send(response);
    });
  });
  module.exports = lists;
