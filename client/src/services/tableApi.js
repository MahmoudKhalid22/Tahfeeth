import axios from "axios";

const getTables = async (token, stdId) => {
  try {
    const res = await axios.get(
      "https://tahfeeth-system.onrender.com/table/" + stdId,
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
};

const addTable = async (token, stdId, body) => {
  try {
    const res = await axios.post(
      "https://tahfeeth-system.onrender.com/table/" + stdId,
      {
        body: body,
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};

export { getTables, addTable };
