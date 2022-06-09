favoritesItems.forEach((item) => {
  if (document.getElementById(`${item.episode_id}`)) {
    document.getElementById(`${item.episode_id}`).classList.add("selected");
  }
});
