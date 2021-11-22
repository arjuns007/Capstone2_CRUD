const { json, query } = require("express");
const express = require("express");
const router = express.Router();

// importing Data Model
const Game = require("../models/game");

// Get all Games Used .lean() to format the mongoDB output
router.get("/", (req, res) => {
  Game.find((err, docs) => {
    if (!err) {
      res.render("mainLayout", {
        list: docs,
        viewTitle: "Insert Game",
      });
    } else {
      console.log("Error in retrieving Games :" + err);
    }
  }).lean();
});

// calling the update and insert functions
router.post("/", (req, res) => {
  if (req.body._id == "") insertRecord(req, res);
  else updateRecord(req, res);
});

// Find Game by id and Update it
router.get("/:id", (req, res) => {
  try {
    Game.find((err, docs) => {
      if (!err) {
        list1 = docs;
      } else {
        console.log("Error in retrieving Game :" + err);
      }
    }).lean();
    Game.findById(req.params.id, (err, doc) => {
      if (!err) {
        res.render("mainLayout", {
          viewTitle: "Update Game",
          game: doc,
          list: list1,
        });
      }
    }).lean();
  } catch (err) {
    res.send("Error " + err);
  }
});

// Deleting the game record
router.get("/delete/:id", (req, res) => {
  Game.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.redirect("/game");
    } else {
      console.log("Error in deleting game :" + err);
    }
  });
});

// Insert Function
function insertRecord(req, res) {
  var game = new Game();
  game.title = req.body.title;
  game.developer = req.body.developer;
  game.genre = req.body.genre;
  game.year = req.body.year;
  game.price = req.body.price;
  game.save((err) => {
    if (!err) {
      res.redirect("/game");
    } else {
      console.log("Error during record insertion : " + err);
    }
  });
}
// Update Function
function updateRecord(req, res) {
  Game.findOneAndUpdate(
    { _id: req.body._id },
    req.body,
    { new: true },
    (err, doc) => {
      if (!err) {
        res.redirect("/game");
      } else {
        console.log("Error during record update : " + err);
      }
    }
  ).lean();
}

module.exports = router;

