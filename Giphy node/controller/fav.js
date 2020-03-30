var fav = require("express").Router();
var client = require("../config/config");

fav.post("/", async (req, res) => {
  const insert = await req.body.name.map((items, index) => {
    console.log(items.title);
    client.query(
      `insert into tbgiphy (name,url) values('${items.title}','${items.url}')`
    );
  });
});

module.exports = fav;
