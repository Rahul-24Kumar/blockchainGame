const gameModel = require("../models/gamesModel");

const createGames = async (req, res) => {
  let { gameId, nameOfGame, typeOfGame } = req.body;

  gameId = Math.floor(10000000 + Math.random() * 900000);

  let gamedata = await gameModel.create(gameId, nameOfGame, typeOfGame);

  let gameRecord = gamedata.toObject();
  delete gameRecord.__v;

  return res.status(201).send({ msg: "Successfull", gameRecord });
};

const allGames = async (req, res) => {
  try {
    let data = await gameModel
      .find()
      .sort({ createdAt: -1 })
      .select({ __v: 0 });

    if (!data) {
      res.status(400).send({ msg: "games not found" });
    } else {
      return res.status(200).send({ msg: "Successfull", data });
    }
  } catch (err) {
    return res.status(500).send({ msg: "Error occured!" });
  }
};
module.exports = {
  createGames,
  allGames,
};
