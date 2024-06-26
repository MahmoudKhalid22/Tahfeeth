import axios from "axios";

async function getTeachers() {
  try {
    const res = await axios.get(
      "https://tahfeeth-production-36fe.up.railway.app/user/teachers"
    );
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

async function getTeacher(id) {
  try {
    const res = await axios.get(
      "https://tahfeeth-production-36fe.up.railway.app/user/teacher/" + id
    );
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

export { getTeachers, getTeacher };
