async function login(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = {
    username: formData.get("userName"),
    password: formData.get("userPassword"),
  };
  console.log(data);
  axios.post("http://localhost:3020/api/login", data);
}
