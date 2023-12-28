const { default: mongoose } = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema({
  fullName: {
    type: String,
    trim: true,
    required: true,
    message: "Please enter your full name",
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: true,
    message: "Please enter a password",
  },
});

userSchema.methods.comparePassword = function (password, hash) {
  const isValidPassword = bcrypt.compareSync(password, hash);
  return isValidPassword;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
