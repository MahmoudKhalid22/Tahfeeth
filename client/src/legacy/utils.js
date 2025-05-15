// useEffect(() => {
//   setModal(isUpdatingPassword);
// }, [isUpdatingPassword]);

// const updateUsername = async (e) => {
//   e.preventDefault();
//   try {
//     setLoadingName(true);
//     const response = await fetch(
//       `https://tahfeeth-production.up.railway.app/user/update-username`,
//       {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: "Bearer " + data?.accessToken,
//         },
//         body: JSON.stringify({
//           name: username.trim().length > 0 ? username : null,
//         }),
//       }
//     );

//     if (!response.ok) {
//       throw new Error(await response.json());
//     }

//     const updatedData = await response.json();
//     // // console.log(updatedData);

//     const existingData = JSON.parse(localStorage.getItem("data"));
//     existingData.user.name = updatedData.name;

//     const updatedDataStr = JSON.stringify(existingData);
//     localStorage.setItem("data", updatedDataStr);
//     window.location.reload();
//   } catch (e) {
//     setError(true);
//   } finally {
//     setLoadingName(false);
//   }
// };

// const data = JSON.parse(localStorage.getItem("data"))
//   ? JSON.parse(localStorage.getItem("data"))
//   : null;

// const uploadAvatar = async (e) => {
//   e.preventDefault();
//   try {
//     const formData = new FormData();

//     formData.append("avatar", avatar);
//     setLoading(true);
//     const response = await fetch(
//       "https://tahfeeth-system.onrender.com/user/upload-avatar",
//       {
//         method: "POST",
//         body: formData,
//         headers: {
//           Authorization: "Bearer " + token,
//         },
//       }
//     );
//     if (!response.ok) {
//       // // console.log(await response.json());
//       throw new Error();
//     }

//     const result = await response.json();

//     const userAvatar = result?.user?.avatar;
//     const userData = JSON.parse(localStorage.getItem("data"));
//     // console.log(userData);
//     userData.user.avatar = userAvatar;
//     const updatedData = JSON.stringify(userData);
//     localStorage.setItem("data", updatedData);
//     window.location.reload();
//   } catch (err) {
//     // // console.log(err);
//     setError(true);
//   } finally {
//     setLoading(false);
//   }
// };

// const updatePassword = async (e) => {
// e.preventDefault();
// try {
//   setLoadingPass(true);
//   const res = await fetch(
//     "https://tahfeeth-production.up.railway.app/user/update-password",
//     {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + data?.accessToken,
//       },
//       body: JSON.stringify({
//         oldPassword: oldPassword,
//         newPassword: newPassword,
//       }),
//     }
//   );
//   const result = await res.json();
//   if (!res.ok) {
//     // // console.log(result);
//     throw new Error(result.error);
//   }
//   setModal(false);
//   setMsg(result.message);
//   setTimeout(() => {
//     setMsg("");
//   }, 3000);
// } catch (err) {
//   setErrPass(err.message);
// } finally {
//   setLoadingPass(false);
// }
// };

// const joinToTeacher = async () => {
//   try {
//     setLoadingJoin(true);
//     const response = await fetch(
//       "https://tahfeeth-system.onrender.com/user/join/" + id,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: "Bearer " + data?.accessToken,
//         },
//       }
//     );
//     if (!response.ok) {
//       const err = await response.json();
//       throw new Error(err.err);
//     }
//     const result = await response.json();
//     if (result) {
//       setMessage("تمت إضافتك للمعلم");
//     }
//   } catch (err) {
//     setErrJoin(err.message);
//   } finally {
//     setLoadingJoin(false);
//   }
// };

// const getStudents = async () => {
//   try {
//     const isTeacher = userData?.role === "teacher";
//     let id;
//     if (isTeacher) id = userData._id;
//     setLoading(true);
//     const response = await fetch(
//       "https://tahfeeth-production.up.railway.app/user/students/" + id,
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: "Bearer " + teacherToken,
//         },
//       }
//     );
//     const students = await response.json();
//     if (!response.ok) {
//       throw new Error(students);
//     }
//     dispatch({ type: "students", payload: students?.students });
//   } catch (err) {
//     setError(true);
//   } finally {
//     setLoading(false);
//   }
// };

// const getData = async () => {
//   try {
//     setLoadingData(true);
//     const response = await fetch(
//       "https://tahfeeth-production.up.railway.app/user/me",
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: "Bearer " + data?.accessToken,
//         },
//       }
//     );
//     const result = await response.json();
//     if (!response.ok) {
//       throw new Error(await response.json());
//     }
//     setUserData(result);
//   } catch (err) {
//     setError(true);
//   } finally {
//     setLoadingData(false);
//   }
// };

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   try {
//     const response = await fetch(
//       "https://tahfeeth-system.onrender.com/user/teacher/signup",
//       {
//         method: "POST",
//         body: JSON.stringify({
//           name: name,
//           email: email,
//           password: password,
//           age: age,
//           status: "verified",
//           verified: true,
//           role: admin ? role : "student",
//           price: admin ? (role === "teacher" ? price : null) : null,
//           professional: admin
//             ? role === "teacher"
//               ? professional
//               : null
//             : null,
//           information: admin
//             ? role === "teacher"
//               ? information
//               : null
//             : null,

//           id: admin ? (role === "student" ? teacherId : null) : null,
//         }),
//         headers: {
//           "Content-Type": "application/json",

//           Authorization: "Bearer " + token,
//         },
//       }
//     );

//     if (!response.ok) {
//       const errorData = await response.json();
//       // console.log(errorData);
//       throw new Error(errorData.error);
//     }
//     setName("");
//     setEmail("");
//     setPassword("");

//     setInfo(await response.json());
//     setTimeout(() => setInfo(false), 2000);
//   } catch (err) {
//     // console.log(err);
//   }
// };
