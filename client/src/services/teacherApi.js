import axios from "axios";

const getStudents = async (teacherId, token) => {
  try {
    const res = await axios.get(
      "https://tahfeeth-system.onrender.com/user/students/" + teacherId,
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

export { getStudents };
