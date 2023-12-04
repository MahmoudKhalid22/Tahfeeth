import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GiExitDoor } from "react-icons/gi";
import styles from "./Input.module.css";

function Input() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear any previous errors
    setLoading(false);

    try {
      setLoading(true);
      const response = await fetch(
        "https://tahfeeth-system.onrender.com/users/login",
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
      setError(null);

      if (!response.ok) {
        const errorData = await response.json();
        setLoading(false);
        throw new Error(errorData.error);
      }

      setLoading(false);
      const dataUser = await response.json();
      localStorage.setItem("data", JSON.stringify(dataUser));
      navigate("/details");

      // Reset the form data
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.wrapper}>
        <img
          src="https://img.freepik.com/free-vector/realistic-three-dimensional-arabic-ornamental-background_52683-59086.jpg?size=626&ext=jpg&ga=GA1.1.493938250.1694873725&semt=ais"
          alt="background-form"
        />
      </div>

      <form className={styles.container} onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="الاسم"
            id="name"
          />
          <label htmlFor="name">الاسم</label>
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="كلمة السر"
            id="pass"
          />
          <label htmlFor="pass">كلمة السر</label>
        </div>
        <p className={styles.error}>{`${error ? error : ""}`}</p>
        {loading && <p className={styles.loading}>تــحمــيل ...</p>}
        <button>
          <GiExitDoor />
          <span>دخول</span>
        </button>
      </form>
    </div>
  );
}

export default Input;
