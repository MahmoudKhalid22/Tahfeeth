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

const addTable = async (data) => {
  try {
    const res = await axios.post(
      "https://tahfeeth-system.onrender.com/table/create-table",

      {
        ...data?.tableUser,
        ownerId: data?.studentId,
      },
      {
        headers: {
          Authorization: "Bearer " + data?.token,
        },
      }
    );
    return res.data;
  } catch (err) {
    console.log(err);
    throw new Error(err.response.data.message);
  }
};

export { getTables, addTable };
