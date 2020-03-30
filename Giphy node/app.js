const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var client = require("./config/config");

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.listen(3006, () => {
  console.log("port 3025 started");
});

app.use("/", require("./router/fav"));


app.use("/delete",require("./router/del"));  

app.use("/list",require("./router/lists"));




















// app.post("/delete", (req, res) => {
//   client.query(`DELETE FROM tbgiphy WHERE name='${req.body.name}'`);
//   console.log("DElete done");
// });


  

// app.get("/list", (req, res) => {
//   client.query("Select * from tbgiphy", (err, response) => {
//     res.send(response);
//   });
// });
