const mongoose = require("mongoose");

const gameSchema = mongoose.Schema({
  gameId: {
    type: Number,
    unique: true,
  },

  nameOfGame: {
    type: String,
    required: true,
    unique: true,
  },

  typeOfGame: {
    type: String,
  },
});

module.exports = mongoose.model("games", gameSchema);
