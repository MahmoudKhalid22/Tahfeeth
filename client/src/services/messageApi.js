import axios from "axios";
async function addMessage(data) {
  try {
    const res = await axios.post(
      "https://tahfeeth-system.onrender.com/user/message",
      {
        name: data.name,
        email: data.email,
        msg: data.message,
      }
    );
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

export { addMessage };
