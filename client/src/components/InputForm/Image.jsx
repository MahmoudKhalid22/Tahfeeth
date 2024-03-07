import React from "react";

function Image() {
  return (
    <div className="hidden md:flex items-center justify-center w-1/2 h-[40rem]">
      <img
        src="/assets/registeration.avif"
        alt="background-form"
        className="w-full h-full rounded-tl-xl rounded-bl-xl object-cover"
      />
    </div>
  );
}

export default Image;
