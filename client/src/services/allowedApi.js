import axios from "axios";

async function getTeachers() {
  try {
    const res = await axios.get("http://localhost:5000/user/teachers");
    return res.data;
  } catch (err) {
    throw new Error(err.message);
  }
}

async function getTeacher(id) {
  try {
    const res = await axios.get(
      "https://tahfeeth-system.onrender.com/user/teacher/" + id
    );
    return res.data;
  } catch (err) {}
}

export { getTeachers, getTeacher };
