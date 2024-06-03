import axios from "axios";

const getStudents = async (teacherId, token) => {
  const res = await axios.get(
    "https://tahfeeth-system.onrender.com/user/students/" + teacherId,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  return res.data.students;
};

export { getStudents };
