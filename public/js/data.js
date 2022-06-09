const data = [];

fetch("https://swapi.dev/api/films/")
  .then((result) => result.json())
  .then((result) => {
    result.results.map((film) => {
      data.push(film);
    });
  });
