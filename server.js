const express = require("express");
const cors = require("cors");
const { router } = require("./router/router");
const { default: mongoose } = require("mongoose");

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);

const PORT = 4000;

app.listen(PORT, async () => {
  console.log("server is started at port", PORT);
  await mongoose.connect("mongodb://localhost:27017/")
  console.log("db is connected");
});
