const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const app = require("./app");

mongoose.connect(process.env.DATABASE).then(() => {
  console.log(`Database is connected successfuly`);
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
