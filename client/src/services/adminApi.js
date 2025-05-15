import api from "./api";

const addTeacher = async (data) => {
  try {
    const res = await api.post(
      "/user/admin/add-user",
      {
        name: data.name,
        email: data.email,
        password: data.password,
        age: data.age,
        role: "teacher",
        information: data.information,
        price: data.price,
        professional: data.professional,
      },
      {
        headers: {
          Authorization: "Bearer " + data?.token,
        },
      }
    );

    console.log(res.data);

    return res.data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

const addStudent = async (data) => {
  console.log(data);
  try {
    const res = await api.post(
      "/user/admin/add-user",
      {
        name: data.name,
        email: data.email,
        password: data.password,
        age: data.age,
        role: "student",
        teacherId: data.teacherId,
      },
      {
        headers: {
          Authorization: "Bearer " + data?.token,
        },
      }
    );
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log(err);
    throw new Error(err.response.data.error);
  }
};

const getMessages = async (adminToken) => {
  try {
    const res = await api.get("/message", {
      headers: {
        Authorization: "Bearer " + adminToken,
      },
    });
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log(err);
    throw new Error(err.response.data.error);
  }
};

export { addTeacher, addStudent, getMessages };
