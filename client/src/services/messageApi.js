import api from "./api";

async function addMessage(data) {
  try {
    const res = await api.post("/message/new", {
      name: data.name,
      email: data.email,
      msg: data.message,
    });
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

export { addMessage };
