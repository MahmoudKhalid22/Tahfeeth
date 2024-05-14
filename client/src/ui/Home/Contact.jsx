import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Error from "../utils/Error";
import { useMutation } from "@tanstack/react-query";
import addMessage from "../../services/messageApi";
import toast from "react-hot-toast";

function Contact() {
  const { register, handleSubmit, reset, formState } = useForm();

  const { errors } = formState;

  const { isPending, mutate } = useMutation({
    mutationFn: addMessage,
    onSuccess: () => {
      toast.success("تم إرسال رسالتك بنجاح");
      reset();
    },
    onError: () => {
      toast.error("خطأ داخلي حاول لاحقا");
    },
  });

  const submitForm = (data) => {
    mutate(data);
  };

  return (
    <>
      <div
        id="contact"
        className="flex items-center justify-center flex-row-reverse py-16 mt-16 gap-12 overflow-x-hidden"
      >
        <div className="w-80 lg:w-[25.75rem] h-[33.875rem] flex-1/2 md:block hidden">
          <img
            src="/assets/form.jpg"
            alt="form bg"
            className="w-full rounded-3xl h-full object-cover "
          />
        </div>
        <form
          className="flex flex-col h-[35rem] gap-7 md:flex-1/2 w-[90%]  sm:w-72 lg:w-[25.75rem]"
          onSubmit={handleSubmit(submitForm)}
        >
          <div className="h-16 rounded-lg px-4 lg:px-8  py-2 lg:py-4 text-lg lg:text-2xl">
            <input
              type="text"
              placeholder="الاسم"
              className="h-16 w-full rounded-lg px-4 lg:px-8  py-2 lg:py-4 text-lg lg:text-2xl"
              id="name"
              {...register("name", {
                required: "يجب إدخال اسمك",
              })}
            />
            {errors.name?.message && <Error>{errors.name.message}</Error>}
          </div>
          <div className="h-16 rounded-lg px-4 lg:px-8  py-2 lg:py-4 text-lg lg:text-2xl">
            <input
              type="email"
              placeholder="البريد الإلكتروني"
              className="h-16 w-full rounded-lg px-4 lg:px-8  py-2 lg:py-4 text-lg lg:text-2xl"
              id="email"
              {...register("email", {
                required: "يجب إدخال الايميل",
              })}
            />
            {errors.email?.message && <Error>{errors.email.message}</Error>}
          </div>
          <div className="h-[16.5rem] rounded-lg px-4 lg:px-8  py-2 lg:py-4 text-lg lg:text-2xl">
            <textarea
              type="text"
              placeholder="الرسالة"
              className="h-full  w-full rounded-lg px-4 lg:px-8  py-2 lg:py-4 text-lg lg:text-2xl"
              id="message"
              {...register("message", {
                required: "يجب إدخال الرسالة",
              })}
            />
            {errors.message?.message && <Error>{errors.message.message}</Error>}
          </div>
          <div className="w-full h-16 rounded-lg px-4 lg:px-8  py-2 lg:py-4 text-lg lg:text-2xl">
            <button
              disabled={isPending}
              className="rounded-lg w-full bg-[#948366] hover:bg-[#685c47] transition-colors text-white h-16   px-4 lg:px-8  py-2 lg:py-4 text-lg lg:text-2xl"
            >
              {isPending ? "تحميل" : "إرسال"}
            </button>
          </div>
        </form>
      </div>

      {/* {time && (
        <p
          className={`flex items-center justify-center flex-row-reverse mt-4 gap-12 mr-16 lg:mr-[16rem] overflow-hidden text-3xl font-semibold  ${
            error ? "text-red-600" : "text-[#948366]"
          } `}
        >
          {error ? "خطأ داخلي في السيرفر، من فضلك حاول في وقت لاحق" : res.msg}
        </p>
      )} */}
    </>
  );
}

export default Contact;
