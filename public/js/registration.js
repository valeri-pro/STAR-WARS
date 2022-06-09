const imageInput = document.querySelector("#imageInput");
const imagePreview = document.querySelector("#imagePreview");

imageInput.addEventListener("change", onImageChange);

function onImageChange(event) {
  const [file] = event.target.files;
  if (file) {
    imagePreview.src = URL.createObjectURL(file);
    imagePreview.parentElement.classList.remove("hidden");
  }
}

function deleteImage() {
  imageInput.value = "";
  imagePreview.removeAttribute("src");
  imagePreview.parentElement.classList.add("hidden");
}

const convertToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

async function createUser(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = {
    username: formData.get("userName"),
    email: formData.get("userEmail"),
    password: formData.get("userPassword"),
    image: await convertToBase64(formData.get("image")),
  };

  axios.post("http://localhost:3020/api/user", data);
}
