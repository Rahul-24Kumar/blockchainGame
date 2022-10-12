const express = require("express");
const router = express.Router();

const games = require("../controllers/gamesController");

router.post("/games", games.createGames);

router.get("/allGames", games.allGames);

module.exports = router;
