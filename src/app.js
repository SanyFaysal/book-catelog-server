const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const { userRoutes } = require("./app/module/user/user.route");
const { bookRoutes } = require("./app/module/book/book.route");

app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/book", bookRoutes);

module.exports = app;
