const express = require("express");
const path = require("path");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");

const filmRoute = require("./routes/film.route");
const app = express();

app.use(
  cookieSession({
    name: "session",
    keys: ["privet"],
    //     // Cookie Options
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);

app.use(bodyParser.json({ limit: "20mb" }));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

// setup logger
app.use(logger("dev"));
app.use(express.static(path.join(__dirname, "public")));

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
app.get("/", function (request, response) {
  response.render("index", {});
});

app.use(filmRoute);
app.listen(3020);
