import axios from "axios";
async function newUser(data) {
  try {
    const res = await axios.post(
      "https://tahfeeth-production.up.railway.app/user/signup",
      {
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role || "student",
        professional: data?.professional || undefined,
        price: data?.price || undefined,
        description: data?.description || undefined,
      }
    );

    return res.data;
  } catch (err) {
    console.log(err);
    throw new Error("couldn't register please try again!");
  }
}

async function loginUser() {}

async function logoutUser() {}

async function getUser() {}
