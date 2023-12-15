import React from "react";
import Input from "../components/Input";
import { useSearchParams } from "react-router-dom";
import NewAccount from "../components/NewAccount";

function Register() {
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";
  return (
    <div>
      {isLogin && <Input />}
      {!isLogin && <NewAccount />}
    </div>
  );
}

export default Register;
