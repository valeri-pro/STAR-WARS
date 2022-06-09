const loader = document.querySelector(".lds-ripple");
const buttonLoad = document.getElementById("loadMore");

buttonLoad.addEventListener("click", loadMore);

for (let i = 0; i <= 4; i++) {
  urls.shift(urls[i]);
}

async function loadMore() {
  for (let i = 0; i <= 4; i++) {
    if (urls.length === 0) {
      noMoreLoader();
    }

    const reg = urls[i].match(/\d*\/$/gim).join("");
    showLoader();

    const response = await axios.get(
      `https://star--wars.herokuapp.com/people/` + reg
    );
    const actor = response.data;

    const div = document.createElement("div");
    div.classList.add("wrapper");
    div.innerHTML = `
         <div class="actor__name">${actor.name}</div>
         <img class="actor__picture" src="${actor.image}">
         <a href="${actor.wiki}"><div class="actor__wiki"> Wikipedia </div></a>
    `;
    loader.before(div);

    let indexForDelete = urls.indexOf(
      `https://swapi.dev/api/people/${actor.id}/`
    );
    urls.splice(indexForDelete, 1);
    hideLoader();
  }
}

function showLoader() {
  loader.classList.remove("hidden");
  buttonLoad.textContent = `Loading...`;
  buttonLoad.setAttribute("disabled", "disabled");
}

function hideLoader() {
  loader.classList.add("hidden");
  buttonLoad.textContent = `LOAD MORE`;
  buttonLoad.removeAttribute("disabled", "disabled");
}

function noMoreLoader() {
  loader.remove();
  buttonLoad.setAttribute("disabled", "disabled");
  buttonLoad.textContent = `No More`;
  buttonLoad.removeEventListener("click", loadMore);
}
