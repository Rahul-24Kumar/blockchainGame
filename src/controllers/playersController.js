const playersModel = require("../models/playersModel");

const createPlayers = async (req, res) => {
  let { username, score, wins, losses } = req.body;
  try {
    if (!username) {
      return res.status(400).send({ msg: "username is required!" });
    }

    const isAlreadyExist = await playersModel.findOne({ username });

    if (isAlreadyExist) {
      return res.status(400).send({
        msg: "player is already registered, please create unique username",
      });
    } else {
      let newPlayers = { username, score, wins, losses };
      let result = await playersModel.create(newPlayers);
      let resultData = result.toObject();
      delete resultData.__v;

      return res.status(201).send({ msg: "player is registered", resultData });
    }
  } catch (err) {
    res.status(500).send({
      msg: err.msg,
    });
  }
};

const getPlayers = async (req, res) => {
  try {
    let allPlayers = await playersModel
      .find()
      .sort({ createdAt: -1 })
      .select({ __v: 0 });
    res.status(200).send({ msg: "List of Players", allPlayers }).select({ __v: 0 });
  } catch (err) {
    res.status(500).send({ msg: "Error occured!" });
  }
};

const getPlayerById = async (req, res) => {
  let playerId = req.params.id;
  let getPlayer = await playersModel.findById(playerId).select({ __v: 0 });
  try {
    if (getPlayer) {
      return res.status(200).send(getPlayer);
    } else {
      return res.status(404).send({ msg: "player doesn't exist" });
    }
  } catch (err) {
    res.status(500).send({ msg: "Error occured!" });
  }
};

const getPlayerByName = async (req, res) => {
  let username = req.params.username;
  let getPlayer = await playersModel.findOne({ username }).select({ __v: 0 });
  try {
    if (!getPlayer) {
      res.status(404).send({ msg: "player doesn't exist" });
    } else {
      return res.status(200).send(getPlayer);
    }
  } catch (err) {
    res.status(500).send({ msg: err.msg });
  }
};

const updatePlayer = async (req, res) => {
  let { username, won, lost, played, winRatio } = req.body;

  let isUserExist = await playersModel.findOne({ username });

  try {
    if (!isUserExist) {
      return res.status(404).send({ msg: "player doesn't exist" });
    }

    if (won) {
      won = won + 1;
      played = played + 1;
      winRatio = (won * 100) / played;

      let wondata = await playersModel.findOneAndUpdate(
        { username },
        {
          $set: {
            won: won,
            played: played,
            winRatio: winRatio,
          },
        }
      );
      return res.status(200).send({ msg: "successful", wondata });
    } else {
      lost = lost + 1;
      played = played + 1;
      winRatio = (won * 100) / played;

      let lostdata = await playersModel.findOneAndUpdate(
        { username },
        {
          $set: {
            lost: lost,
            played: played,
            winRatio: winRatio,
          },
        }
      );
      return res.status(200).send({ msg: "successful", lostdata });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "Error occured!" });
  }
};

const getLeaderBoard = async (req, res) => {
  try {
    let getLeaderBoard = await playersModel
      .find()
      .sort({ win: -1 })
      .countDocuments().select({username: 1});
    return res.status(200).send({ msg: successfull, getLeaderBoard });
  } catch (error) {
    return res.status(500).send({ msg: "Error occured!" });
  }
};

module.exports = {
  createPlayers,
  getPlayers,
  getPlayerById,
  getPlayerByName,
  updatePlayer,
  getLeaderBoard,
};



/* const leaderBoard = async (req, res) => {
  let { username, won, lost, played, winRatio } = req.body;
  if (won)
    update({}, [
      {
        $set: {
          won: { $add: ["$won", 1] },
          played: { $add: ["$played", 1] },
        },
      },
      {
        $set: {
          "games.winRatio": {
            $multiply: [100, { $divide: ["$games.won", "$games.played"] }],
          },
        },
      },
    ]);
  else
    update({}, [
      {
        $set: {
          "games.lost": { $add: ["$games.lost", 1] },
          "games.played": { $add: ["$games.played", 1] },
        },
      },
      {
        $set: {
          "games.winRatio": {
            $multiply: [100, { $divide: ["$games.won", "$games.played"] }],
          },
        },
      },
    ]);
}; */

/* 

let wondata = await playersModel.findOneAndUpdate(
        { username },
        {
          $set: {
            won: { $add: ["$won", 1] },
            // lost: lost,
            played: { $add: ["$played", 1] },
            // winRatio: ("$won" * 100) / "$played",
            // winRatio: { $multiply: [100, { $divide: ["$won", "$played"] }] },
          },
        }
      );

*/

/* 

   let lostdata = await playersModel.findOneAndUpdate(
        { username },
        {
          $set: {
            // won: won,
            lost: { $add: ["$lost", 1] },
            played: played + 1,
            winRatio: (won * 100) / played,
            //winRatio: { $multiply: [100, { $divide: ["$won", "$played"] }] },
          },
        }
      );
*/
