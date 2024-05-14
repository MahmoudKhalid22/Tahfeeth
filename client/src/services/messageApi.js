import axios from "axios";
async function addMessage(data) {
  const res = await axios.post(
    "https://tahfeeth-production.up.railway.app/user/message",
    {
      name: data.name,
      email: data.email,
      msg: data.message,
    }
  );
  return res.data;
}

export default addMessage;
