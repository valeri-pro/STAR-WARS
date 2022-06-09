function renderFilms(array) {
  let html = ``;
  let idForUrl;
  for (let i = 0; i < array.length; i++) {
    if (array[i].episode_id === 1) {
      idForUrl = 4;
    }
    if (array[i].episode_id === 2) {
      idForUrl = 5;
    }
    if (array[i].episode_id === 3) {
      idForUrl = 6;
    }
    if (array[i].episode_id === 4) {
      idForUrl = 1;
    }
    if (array[i].episode_id === 5) {
      idForUrl = 2;
    }
    if (array[i].episode_id === 6) {
      idForUrl = 3;
    }

    html += `
       <div class="wrapper">
         <a href='/film/${idForUrl}'> <img class = "film__picture" src="http://localhost:3020/posters/${array[i].episode_id}.jpg">
          <div class="film__info">
            <div class="film__title"> ${array[i].title} </div>
            <div class="film__episode"> Episode № ${array[i].episode_id} </div>
            <div class="film__date"> Realese date: ${array[i].release_date} </div>
          </div> 
        </a>
        <span id="${array[i].episode_id}" class="material-icons-outlined absolute" onclick="addToFavorites(${array[i].episode_id})">favorite
        </span>
      </div>
         `;
  }
  container.innerHTML = html;
}
