const list = document.getElementById("list");
const block = document.getElementById("module");

function activeList() {
  block.classList.add("noActive");
  list.classList.remove("noActive");
}
function activeBlock() {
  block.classList.remove("noActive");
  list.classList.add("noActive");
}

const SHOW_KEY = "show";
let display = JSON.parse(localStorage.getItem(SHOW_KEY)) || "blocks";

if (localStorage.getItem(SHOW_KEY)) {
  display = JSON.parse(localStorage.getItem(SHOW_KEY));
} else {
  display = "blocks";
}

list.addEventListener("click", onclickList);
block.addEventListener("click", onclickBlock);

function onclickList() {
  display = "list";
  localStorage.setItem(SHOW_KEY, JSON.stringify(display));
}

function onclickBlock() {
  display = "blocks";
  localStorage.setItem(SHOW_KEY, JSON.stringify(display));
}

list.addEventListener("click", show);
block.addEventListener("click", show);

function show() {
  if (display === "list") {
    container.classList.add("list");
    container.classList.remove("blocks");
    activeList();
  }
  if (display === "blocks") {
    container.classList.add("blocks");
    container.classList.remove("list");
    activeBlock();
  }
}

show();
