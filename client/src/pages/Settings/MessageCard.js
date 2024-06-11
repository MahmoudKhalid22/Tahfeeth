import React from "react";

const Card = ({ name, email, message }) => {
  return (
    <div
      className="bg-white shadow-md rounded-lg p-6 w-80 mx-auto my-4 border-l-4"
      style={{ borderColor: "#43766C" }}
    >
      <div className="mb-4">
        <h2
          className="text-xl font-semibold text-gray-800"
          style={{ color: "#43766C" }}
        >
          {name}
        </h2>
      </div>
      <div className="mb-2">
        <p className="text-gray-700 overflow-x-scroll">
          <strong>Email:</strong> {email}
        </p>
      </div>
      <div>
        <p className="text-gray-700">
          <strong>Message:</strong> {message}
        </p>
      </div>
    </div>
  );
};

export default Card;
