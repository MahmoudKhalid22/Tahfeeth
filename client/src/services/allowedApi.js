import api from "./api";

async function getTeachers() {
  try {
    const res = await api.get("/user/teachers");
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

async function getTeacher(id) {
  try {
    const res = await api.get("/user/teacher/" + id);
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

export { getTeachers, getTeacher };
