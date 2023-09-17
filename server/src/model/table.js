const mongoose = require("mongoose");
const User = require("./user");

const tableSchema = new mongoose.Schema(
  {
    day: {
      type: String,
      required: true,
    },
    quantity: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
    tasks: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      required: true,
    },
    questions: {
      type: String,
      required: true,
    },
    answers: {
      type: Number,
      required: true,
    },
    notes: {
      type: String,
      required: true,
    },
    rate: {
      type: Number,
      required: true,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Table = new mongoose.model("Table", tableSchema);

module.exports = Table;
