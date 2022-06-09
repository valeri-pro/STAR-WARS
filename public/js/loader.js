for (let i = 0; i < 6; i++) {
  const loader = document.createElement("div");
  loader.classList.add("lds-ripple");
  loader.innerHTML = `<div></div><div></div>`;
  container.append(loader);
}
