const favoritesItemsContainerElement = document.getElementById(
  "favoritesItemsContainer"
);

renderFavorites();

function addToFavorites(episodeId) {
  const film = data.find((item) => item.episode_id === episodeId);
  if (
    !favoritesItems.includes(
      favoritesItems.find((item) => item.episode_id === film.episode_id)
    )
  ) {
    favoritesItems.push(film);
    document.getElementById(`${film.episode_id}`).classList.add("selected");
  } else {
    const indexOfFilm = favoritesItems.indexOf(
      favoritesItems.find((item) => item.episode_id === film.episode_id)
    );
    removeFromFavorites(indexOfFilm);
  }
  renderFavorites();
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favoritesItems));
}

function renderFavorites() {
  let html = "";
  for (let i = 0; i < favoritesItems.length; i++) {
    const film = favoritesItems[i];
    if (film.episode_id === 1) {
      idForUrl = 4;
    }
    if (film.episode_id === 2) {
      idForUrl = 5;
    }
    if (film.episode_id === 3) {
      idForUrl = 6;
    }
    if (film.episode_id === 4) {
      idForUrl = 1;
    }
    if (film.episode_id === 5) {
      idForUrl = 2;
    }
    if (film.episode_id === 6) {
      idForUrl = 3;
    }
    html += `
      <div class="wrapper--for__favorites">
           <a href="/film/${idForUrl}"> <img src="http://localhost:3020/posters/${film.episode_id}.jpg"></a>
           <a href="/film/${idForUrl}" class="film__info--favorites">
                <h3> ${film.title} </h3>
                <div> Episode: ${film.episode_id} </div>
                <div> Release date: ${film.release_date} </div>
           </a>
           <span onclick="removeFromFavorites(${i})" class="material-icons-outlined"> delete <span>           
      </div>`;
  }
  favoritesItemsContainerElement.innerHTML = html;
}

function removeFromFavorites(itemIndex) {
  console.log(itemIndex);
  let fil = favoritesItems[itemIndex];
  favoritesItems.splice(itemIndex, 1);
  // favoritesItems.splice(favoritesItems.indexOf(fil), 1);
  renderFavorites();
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favoritesItems));
  document.getElementById(`${fil.episode_id}`).classList.remove("selected");
}

// OPEN-CLOSE
const favoritesContainerElement = document.getElementById("favoritesContainer");
const containerElement = document.querySelector(".container--for__favorites");

const openFavoritesElement = document.getElementById("openFavorites");
const closeFavoritesElement = document.getElementById("closeFavorites");

openFavoritesElement.addEventListener("click", openFavorites);
closeFavoritesElement.addEventListener("click", closeFavorites);

function openFavorites() {
  favoritesContainerElement.classList.add("opened");
  favoritesContainerElement.classList.remove("closed");
  containerElement.classList.add("shown");
}

function closeFavorites() {
  setTimeout(() => {
    containerElement.classList.remove("shown");
    favoritesContainerElement.classList.remove("opened");
  }, 500);
  favoritesContainerElement.classList.add("closed");
}
