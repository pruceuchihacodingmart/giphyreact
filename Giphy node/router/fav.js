var route = require("express").Router();
route.use("/favourites", require("../controller/fav"));

module.exports = route;
