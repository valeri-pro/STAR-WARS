import { LowSync, JSONFileSync } from "lowdb";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

const db = new LowSync(new JSONFileSync("db.json"));

export async function createNewUser(username, email, password, image) {
  db.read();
  const hash = await generateHash(password);
  const user = {
    username: username,
    email: email,
    hash: hash,
    image: image,
    id: uuidv4(),
  };
  db.data.users.push(user);
  db.write();
  delete user.hash;
  return user;
}

export async function verifyUser(username, password) {
  db.read();
  const potentionalUser = db.data.users.find(
    (user) => user.username === username
  );
  if (potentionalUser) {
    const isTruePassword = await checkPasswordHash(
      password,
      potentionalUser.hash
    );
    if (isTruePassword) {
      return potentionalUser;
    }
  }
  return null;
}

function generateHash(password) {
  return new Promise((resolve) => {
    bcrypt.hash(password, 10, function (err, hash) {
      // Store hash in your password DB.
      resolve(hash);
    });
  });
}

function checkPasswordHash(password, hash) {
  return new Promise((resolve) => {
    bcrypt.compare(password, hash, function (err, result) {
      // Store hash in your password DB.
      resolve(result);
    });
  });
}
