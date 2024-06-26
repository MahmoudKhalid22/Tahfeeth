import axios from "axios";

const getStudents = async (teacherId, token) => {
  try {
    const res = await axios.get(
      "https://tahfeeth-production-36fe.up.railway.app/user/students/" +
        teacherId,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return res.data.students;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};

const addStudent = async (data) => {
  console.log(data);
  try {
    const res = await axios.post(
      "https://tahfeeth-production-36fe.up.railway.app/user/teacher/signup",
      {
        name: data.name,
        email: data.email,
        password: data.password,
        age: data.age,
        role: "student",
      },
      {
        headers: {
          Authorization: "Bearer " + data?.token,
        },
      }
    );
    // console.log(res.data);
    return res.data;
  } catch (err) {
    // console.log(err);
    throw new Error(err.response.data.err || err.response.data.error);
  }
};

const joinStudent = async (data) => {
  console.log(data);
  try {
    const res = await axios.post(
      "https://tahfeeth-production-36fe.up.railway.app/user/join/" +
        data.teacherId,
      {},
      {
        headers: {
          Authorization: "Bearer " + data?.token,
        },
      }
    );

    return res.data;
  } catch (err) {
    console.log(err);
    throw new Error(err.response.data.err || err.response.data.error);
  }
};

export { getStudents, addStudent, joinStudent };
