import axios from "axios";
import Cookies from "js-cookie";

async function newUser(data) {
  try {
    const res = await axios.post(
      "https://tahfeeth-production-36fe.up.railway.app/user/signup",
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
    let error = "";
    if (err.response.data.err[0] === "E") {
      error = "هذا الحساب موجود مسبقا حاول بحساب آخر";
    }
    throw new Error(
      error || err.response.data.message || err.response.data.err
    );
  }
}

async function loginUserApi(data) {
  try {
    const res = await axios.post(
      "https://tahfeeth-production-36fe.up.railway.app/user/login",
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

async function getUser(token) {
  try {
    const res = await axios.get(
      "https://tahfeeth-production-36fe.up.railway.app/user/me",
      {
        headers: {
          Authorization: "Bearer " + token,
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
      "https://tahfeeth-production-36fe.up.railway.app/user/avatar",
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

async function updateUsername(data) {
  try {
    const res = await axios.put(
      "https://tahfeeth-production-36fe.up.railway.app/user/update-username",

      {
        name: data?.name,
      },
      {
        headers: {
          Authorization: "Bearer " + data?.token,
        },
      }
    );

    return res.data;
  } catch (err) {
    throw new Error(err.response.data.err);
  }
}

async function updatePassword(data) {
  try {
    const res = await axios.put(
      "https://tahfeeth-production-36fe.up.railway.app/user/update-password",
      {
        oldPassword: data?.oldPassword,
        newPassword: data?.newPassword,
      },
      {
        headers: {
          Authorization: "Bearer " + data?.token,
        },
      }
    );
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
}

async function uploadAvatarApi(data) {
  try {
    console.log([...data.formData.entries()]);
    const res = await axios.post(
      "https://tahfeeth-production-36fe.up.railway.app/user/upload-avatar",
      data?.formData,
      {
        headers: {
          Authorization: "Bearer " + data?.token,
        },
      }
    );
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
}

export {
  newUser,
  loginUserApi,
  logoutUserApi,
  getAvatar,
  getUser,
  updateUsername,
  updatePassword,
  uploadAvatarApi,
};
