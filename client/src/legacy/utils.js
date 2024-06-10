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
//     // console.log(updatedData);

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
//       // console.log(await response.json());
//       throw new Error();
//     }

//     const result = await response.json();

//     const userAvatar = result?.user?.avatar;
//     const userData = JSON.parse(localStorage.getItem("data"));
//     console.log(userData);
//     userData.user.avatar = userAvatar;
//     const updatedData = JSON.stringify(userData);
//     localStorage.setItem("data", updatedData);
//     window.location.reload();
//   } catch (err) {
//     // console.log(err);
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
//     // console.log(result);
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
