const express = require("express");
const router = express.Router();
const players = require("../controllers/playersController");
const games = require("../controllers/gamesController");

router.post("/player", players.createPlayers);

router.get("/allPlayers", players.getPlayers);

router.get("/getPlayerById/:id", players.getPlayerById);

router.get("/getPlayerByName/:username", players.getPlayerByName);

router.put("/updatePlayer", players.updatePlayer);

router.post("/games", games.createGames);

router.get("/allGames", games.allGames);

router.get("/allTimeWinner", players.getLeaderBoard);

module.exports = router;
