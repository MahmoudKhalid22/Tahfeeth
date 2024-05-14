import axios from "axios";

async function getTeachers() {
  try {
    const res = await axios.get(
      "https://tahfeeth-production.up.railway.app/user/teachers"
    );
    return res.data;
  } catch (err) {}
}

export default getTeachers;
