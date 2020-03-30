var del = require("express").Router();
var client = require("../config/config");

del.post("/", (req, res) => {
    client.query(`DELETE FROM tbgiphy WHERE name='${req.body.name}'`);
    console.log("DElete done");
  });

  module.exports = del;