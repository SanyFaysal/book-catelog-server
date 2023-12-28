const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const { userRoutes } = require("./app/module/user/user.route");

app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

app.use("/api/v1/user", userRoutes);

module.exports = app;
