import React from "react";
import NewUser from "../../features/auth/AuthUser";
import { useParams, useSearchParams } from "react-router-dom";

function Register({ onSetIsLogin }) {
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";
  return <NewUser isLogin={isLogin} onSetIsLogin={onSetIsLogin} />;
}

export default Register;
