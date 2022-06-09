const select = document.querySelector("select");

select.addEventListener("change", onSortingChange);
function onSortingChange(event) {
  selectedSortType = event.target.value;
  localStorage.setItem(SORT_KEY, JSON.stringify(selectedSortType));
  sort();
}

sort();

function sort() {
  fetch("https://swapi.dev/api/films/")
    .then((result) => result.json())
    .then((result) => {
      if (selectedSortType === "episodeAsc") {
        result.results.sort((a, b) => a.episode_id - b.episode_id);
      }
      if (selectedSortType === "episodeDsc") {
        result.results.sort((a, b) => b.episode_id - a.episode_id);
      }
      if (selectedSortType === "dateAsc") {
        result.results.sort(
          (a, b) =>
            Number(a.release_date.slice(0, 4)) -
            Number(b.release_date.slice(0, 4))
        );
      }
      if (selectedSortType === "dateDsc") {
        result.results.sort(
          (a, b) =>
            Number(b.release_date.slice(0, 4)) -
            Number(a.release_date.slice(0, 4))
        );
      }
      renderFilms(result.results);
      // options.map((item) => {
      //   if (item.value === selectedSortType) {
      //     item.setAttribute("selected", "selected");
      //   }
      // });
    })
    .then(() => {
      favoritesItems.forEach((item) => {
        document.getElementById(`${item.episode_id}`).classList.add("selected");
      });
    });
}
