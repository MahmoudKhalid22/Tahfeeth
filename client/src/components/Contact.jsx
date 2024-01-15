import React from "react";

function Contact() {
  return (
    <div
      id="contact"
      className="flex items-center justify-center flex-row-reverse py-16 mt-16 gap-12 mr-16 lg:mr-[16rem] overflow-x-hidden"
    >
      <div className="w-80 lg:w-[25.75rem] h-[33.875rem] flex-1/2 md:block hidden">
        <img
          src="/assets/form.jpg"
          alt="form bg"
          className="w-full rounded-3xl h-full object-cover "
        />
      </div>
      <form className="flex flex-col h-full gap-7 md:flex-1/2 w-[85%]  sm:w-72 lg:w-[23.75rem]">
        <input
          type="text"
          placeholder="الاسم"
          className="h-16 rounded-lg px-4 lg:px-8  py-2 lg:py-4 text-lg lg:text-2xl"
        />
        <input
          type="email"
          placeholder="البريد الإلكتروني"
          className="h-16 rounded-lg px-4 lg:px-8  py-2 lg:py-4 text-lg lg:text-2xl"
        />
        <textarea
          type="text"
          placeholder="الرسالة"
          className="h-[16.9375rem] rounded-lg px-4 lg:px-8  py-2 lg:py-4 text-lg lg:text-2xl"
        />
        <button className="rounded-lg bg-[#948366] hover:bg-[#685c47] transition-colors text-white h-16   px-4 lg:px-8  py-2 lg:py-4 text-lg lg:text-2xl">
          إرســال
        </button>
      </form>
    </div>
  );
}

export default Contact;
