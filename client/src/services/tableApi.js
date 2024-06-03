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

export { getTables };
