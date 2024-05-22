import axios from "axios";
async function newUser(data) {
  try {
    const res = await axios.post("http://localhost:5000/user/signup", {
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role || "student",
      professional: data?.professional || undefined,
      price: data?.price || undefined,
      information: data?.information || undefined,
    });

    return res.data;
  } catch (err) {
    console.log(err);
    throw new Error("couldn't register please try again!");
  }
}

async function loginUserApi(data) {
  try {
    const res = await axios.post("http://localhost:5000/user/login", {
      email: data.email,
      password: data.password,
    });
    return res.data;
  } catch (err) {
    console.log(err);
    throw new Error(err.response.data.message);
  }
}

async function logoutUser() {}

async function getUser() {}

export { newUser, loginUserApi };
