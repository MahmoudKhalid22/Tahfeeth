import React from "react";

function Error({ children, type = "new" }) {
  return (
    <div
      className={`text-lg ${type === "add" ? "text-red-200" : "text-red-600"} `}
    >
      {children}
    </div>
  );
}

export default Error;
