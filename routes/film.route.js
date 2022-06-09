const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();
let db;
(async () => {
  db = await import("../db.mjs");
})();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
router.use("/film/:id", async function (request, response) {
  const id = request.params.id;
  try {
    const axiosResponse = await axios.get(`https://swapi.dev/api/films/` + id);
    const film = axiosResponse.data;

    const characters = film.characters;

    // первый актер
    const numberFirst = characters[0].match(/\d{1,2}/gi).join("");
    const smthFirst = await axios.get(
      `https://star--wars.herokuapp.com/people/` + numberFirst
    );
    const actorFirst = smthFirst.data;

    // второй актер
    const numberSecond = characters[1].match(/\d{1,2}/gi).join("");
    const smthSecond = await axios.get(
      `https://star--wars.herokuapp.com/people/` + numberSecond
    );
    const actorSecond = smthSecond.data;

    // третий актер
    const numberThird = characters[2].match(/\d{1,2}/gi).join("");
    const smthThird = await axios.get(
      `https://star--wars.herokuapp.com/people/` + numberThird
    );
    const actorThird = smthThird.data;

    // четвертый актер
    const numberFourth = characters[3].match(/\d{1,2}/gi).join("");
    const smthFourth = await axios.get(
      `https://star--wars.herokuapp.com/people/` + numberFourth
    );
    const actorFourth = smthFourth.data;

    // пятый актер
    const numberFifth = characters[4].match(/\d{1,2}/gi).join("");
    const smthFifth = await axios.get(
      `https://star--wars.herokuapp.com/people/` + numberFifth
    );
    const actorFifth = smthFifth.data;

    response.render("film", {
      film,
      actorFirst,
      actorSecond,
      actorThird,
      actorFourth,
      actorFifth,
      url: JSON.stringify(film.characters),
    });
  } catch (e) {
    console.log(e);
    response.send("error");
  }
});

router.use("/authorization", function (request, response) {
  response.render("authorization", {});
});

router.use("/registration", function (request, response) {
  response.render("registration", {});
});

router.post("/api/user", async function (request, response) {
  const { username, email, password, image } = request.body;
  await db.createNewUser(username, email, password, image);
  // response.redirect("..");
});

router.post("/api/login", async function (request, response) {
  const { username, password } = request.body;
  const user = await db.verifyUser(username, password);
  if (user) {
    //token
    request.session.user = user;
    response.send("ok");
    return;
  }
  response.sendStatus(403);
});

module.exports = router;
