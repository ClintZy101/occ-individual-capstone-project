import React from "react";
import SignupForm from "../components/forms/SignupForm";
import { Link } from "react-router-dom";

export default function Register() {

  return (
    <div className="w-screen">
      <div class="relative ">
        <img
          src="https://images.pexels.com/photos/3184416/pexels-photo-3184416.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="shakehands"
          className="w-full h-full object-cover"
        />
        <div class="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white to-transparent blur-lg"></div>
      </div>

      {/* Form Container */}

      <div className="absolute grid place-items-center pt-5  top-0 w-screen ">
        <div className="my-4 text-whitetext-black ">
          <div className="w-full grid gap-2 justify-center">
            <img src="/logo.png" alt="" className="mx-auto" />
            <h1 className="text-3xl font-bold">Create an Account</h1>
            <p className="text-center">Please Enter your details</p>
          </div>
        </div>
        <div className="w-5/6  max-w-[700px]">
          <SignupForm />
        </div>
      </div>
    </div>
  );
}
