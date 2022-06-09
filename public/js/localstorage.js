const SORT_KEY = "sort";
let selectedSortType =
  JSON.parse(localStorage.getItem(SORT_KEY)) || "episodeAsc";

const options = Array.from(document.querySelectorAll("option"));
options.map((item) => {
  if (item.value === selectedSortType) {
    item.setAttribute("selected", "selected");
  }
});

const FAVORITES_KEY = "favoritesItems";
let favoritesItems = JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
