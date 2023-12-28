const { default: mongoose } = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
  fullName: {
    type: String,
    trim: true,
    required: true,
    minLength: [3, "Full name is too short!"],
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

userSchema.pre("save", function (next) {
  const password = this.password;
  const hash = bcrypt.hashSync(password);
  this.password = hash;
  next();
});
userSchema.methods.comparePassword = function (password, hash) {
  const isValidPassword = bcrypt.compareSync(password, hash);
  return isValidPassword;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
