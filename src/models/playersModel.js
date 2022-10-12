const mongoose = require("mongoose");

const playersSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },

    score: {
      type: Number,
      default: 0,
    },

    won: {
      type: Number,
      default: 0,
    },

    lost: {
      type: Number,
      default: 0,
    },

    played: {
      type: Number,
      default: 0,
    },

    winRatio: {
      type: Number,
      default: 0,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Player", playersSchema);
