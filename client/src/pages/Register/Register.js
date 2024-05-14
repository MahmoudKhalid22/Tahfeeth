import React from "react";
import NewUser from "../../features/auth/NewUser";

function Register({ onSetIsLogin }) {
  return <NewUser onSetIsLogin={onSetIsLogin} />;
}

export default Register;
