import axios from "axios";

async function getTeachers() {
  try {
    const res = await axios.get(
      "https://tahfeeth-system.onrender.com/user/teachers"
    );
    return res.data;
  } catch (err) {}
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
