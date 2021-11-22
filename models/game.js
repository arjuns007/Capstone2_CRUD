const mongoose = require("mongoose");

const gameSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  developer: {
    type: String,
    required: true,
  },

  genre: {
    type: String,
    required: true,
  },

  year: {
    type: Number,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Game", gameSchema);
