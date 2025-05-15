import api from "./api";

const getTables = async (token, stdId) => {
  try {
    const res = await api.get("/table/" + stdId, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};

const addTable = async (data) => {
  try {
    const res = await api.post(
      "/table/create-table",

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
    // // console.log(err);
    throw new Error(err.response.data.message);
  }
};

const deleteTable = async (data) => {
  try {
    // // console.log(data);
    const res = await api.delete("/table/" + data?.tableId, {
      headers: {
        Authorization: "Bearer " + data?.teacherToken,
      },
    });
    return res.data;
  } catch (err) {
    // // console.log(err);
    throw new Error(err.response.data.message);
  }
};

export { getTables, addTable, deleteTable };
