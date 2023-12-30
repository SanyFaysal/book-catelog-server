const { default: mongoose } = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      message: "Please enter your full name",
    },
    author: {
      type: String,
      trim: true,
      required: true,
      message: "Please enter your author name",
    },
    genre: {
      type: String,
      trim: true,
      required: true,
      message: "Please enter your genre",
    },
    publication_year: {
      type: String,
      trim: true,
      required: true,
      message: "Please enter your genre",
    },
    added_by: {
      type: ObjectId,
      ref: "User",
    },
    reviews: [
      {
        review_text: {
          type: String,
          required: true,
        },
        ratings: { type: Number, required: true },
        reviewed_by: {
          type: ObjectId,
          ref: "User",
        },
        created_at: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
    created_at: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timeStamps: true,
  }
);

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
