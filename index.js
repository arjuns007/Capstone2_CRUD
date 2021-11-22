const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const exphbs = require("express-handlebars");
const bodyparser = require("body-parser");

// Express App
const app = express();

// MongoDB Connection
const url = "mongodb://localhost/GamesDB";
mongoose.connect(url, { useNewUrlParser: true });
const con = mongoose.connection;
con.on("open", () => {
  console.log("MongoDB Connected..!");
});

// Body parser to parse http requests
app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);
app.use(bodyparser.json());

// Setting up View Engine and Express-Handlebars
app.set("views", path.join(__dirname, "/views/layouts/"));
app.engine(
  "hbs",
  exphbs.engine({
    extname: "hbs",
    defaultLayout: "mainLayout",
    layoutsDir: __dirname + "/views/layouts/",
  })
);
app.set("view engine", "hbs");

// Setting up Controller
const gameRouter = require("./routes/games");
app.use("/game", gameRouter);

//Server Settings
const port =  3000;
app.listen(port, () => console.log(`listening on port ${port}`));
