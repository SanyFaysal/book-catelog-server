const { default: mongoose } = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const {
  READ_LATER,
  READING_NOW,
  ALREADY_READ,
  READ_SOON,
} = require("../../constants/wishlistBookStatus");
const { ObjectId } = mongoose.Types;

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
  wishlist: [
    {
      book: {
        type: ObjectId,
        ref: "Book",
      },
      status: {
        type: String,
        default: READ_LATER,
        enum: {
          values: [READ_LATER, READING_NOW, ALREADY_READ, READ_SOON],
          message: "{VALUE} can't be a status",
        },
      },
    },
  ],
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
