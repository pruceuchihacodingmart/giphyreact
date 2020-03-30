var route = require("express").Router();
route.use("/deletelist", require("../controller/del"));

module.exports = route;
