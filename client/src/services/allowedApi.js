import axios from "axios";

async function getTeachers() {
  try {
    const res = await axios.get(
      "https://tahfeeth-system.onrender.com/user/teachers"
    );
    return res.data;
  } catch (err) {}
}

export default getTeachers;
