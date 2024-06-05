import axios from "axios";
import Cookies from "js-cookie";
async function newUser(data) {
  try {
    const res = await axios.post(
      "https://tahfeeth-system.onrender.com/user/signup",
      {
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role || "student",
        professional: data?.professional || undefined,
        price: data?.price || undefined,
        information: data?.information || undefined,
      }
    );

    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

async function loginUserApi(data) {
  try {
    const res = await axios.post(
      "https://tahfeeth-system.onrender.com/user/login",
      {
        email: data.email,
        password: data.password,
      }
    );
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

function logoutUserApi() {
  Cookies.remove("accessToken");
}

async function getUser(accessToken) {
  try {
    const res = await axios.get(
      "https://tahfeeth-system.onrender.com/user/me",
      {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    );
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

async function getAvatar(token) {
  try {
    const res = await axios.get(
      "https://tahfeeth-system.onrender.com/user/avatar",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

export { newUser, loginUserApi, logoutUserApi, getAvatar, getUser };
