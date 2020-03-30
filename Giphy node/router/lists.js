var route = require("express").Router();
route.use("/lists", require("../controller/lists"));

module.exports = route;
