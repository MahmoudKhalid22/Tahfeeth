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
    throw new Error("حدث بعض الخطأ");
  }
};

const addTable = async (token, stdId, body) => {
  try {
    const res = await axios.post(
      "https://tahfeeth-system.onrender.com/table/" + stdId,
      {
        body: {},
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
  } catch (err) {
    throw new Error("حدث بعض الخطأ");
  }
};

export { getTables, addTable };
