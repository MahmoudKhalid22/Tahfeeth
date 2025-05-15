import { useState } from "react";

function Form({ onSetIsLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const newUser = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(false);
    try {
      setLoading(true);
      const response = await fetch(
        "https://tahfeeth-system.onrender.com/user/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            email: email,
            password: password,
            role: role,
            professional: professional ? professional : null,
            price: price ? price : 0,
            information: information ? information : "",
          }),
        }
      );

      if (!response.ok) {
        setLoading(false);
        const errorData = await response.json();
        // // console.log(errorData);
        throw new Error(errorData.err);
      }
      setName("");
      setEmail("");
      setPassword("");
      setRole("");
      setLoading(false);

      // const dataUser = await response.json();
      // // console.log(dataUser);
      navigate("/verify");
    } catch (err) {
      // // console.log(err.message);

      setError(
        err.message[0] === "E"
          ? "هذا البريد الإلكتروني موجود مسبقا ، حاول ببريد إلكتروني آخر"
          : err.message
      );
    } finally {
      setLoading(false);
    }
  };

  // // console.log(isLogin);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(false);

    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        "https://tahfeeth-system.onrender.com/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );
      if (!response.ok) {
        setLoading(false);
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      // setLoading(false);
      const dataUser = await response.json();
      onSetIsLogin(true);
      localStorage.setItem("data", JSON.stringify(dataUser));
      navigate("/details");
      // Reset the form data
    } catch (error) {
      // console.log(error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // const handleGoogleRegister = async () => {
  //   try {
  //     window.location.href =
  //       "https://tahfeeth-production.up.railway.app/user/auth/google";

  //     // const result = await response.json();
  //     // // console.log(result);
  //   } catch (err) {
  //     // console.log(err);
  //     setError(true);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const handleFacebookRegister = async () => {
  //   try {
  //     // window.location.href = ;
  //     window.open("http://localhost:5000/user/auth/facebook", "_self");
  //   } catch (err) {
  //     // console.log(err);
  //   }
  // };

  return (
    // <div className="flex flex-col items-center w-full">
    {
      /* <div className="flex gap-12 items-center mt-2">
        <button onClick={handleGoogleRegister}>
          <FaGooglePlus className="text-5xl fill-green-600 " />
        </button>
        <button onClick={handleFacebookRegister}>
          <FaFacebook className="text-5xl fill-green-600 " />
        </button>
      </div> */
    }
    // </div>
  );
}

export default Form;
