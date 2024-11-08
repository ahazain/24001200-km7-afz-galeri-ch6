require("dotenv").config();
const config = require("./configs/config");
const express = require("express");
const route = require("./routes/route");
const app = express();
const port = config.port;

app.get("/", (req, res) => {
  res.send("hello word");
});
app.use("/", route);
app.listen(port, () => {
  console.log(`I LOVE YOU ${port}`);
});
