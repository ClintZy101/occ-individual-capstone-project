import React, { useEffect, useState } from "react";
import LoginForm from "../components/forms/LoginForm";
import { Link, useNavigate } from "react-router-dom";


export default function Login() {
  
  return (
    <div className="w-screen">

      

      <div class="relative ">
        <img
          src="https://images.pexels.com/photos/3184416/pexels-photo-3184416.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="shakehands"
          className="w-full h-full object-cover min-h-[700px]"
        />
        <div class="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white to-transparent blur-lg"></div>
      </div>

      {/* Form Container */}

      <div className="absolute grid place-items-center pt-5  top-0 w-screen ">
        <div className="my-4 text-whitetext-black ">
          <div className="w-full grid gap-2 justify-center">
            <img src="/logo.png" alt="" className="mx-auto" />
            <h1 className="text-3xl font-bold">Welcome Back!</h1>
            <p className="text-center">Please Enter your details</p>
          </div>
        </div>
        <div className="w-5/6  max-w-[700px]">
          <LoginForm />
          <Link to={"/register"}>
            <button className="mt-7 text-lg  text-black hover:underline   text-center w-full">
              Don't have an account yet? Sign up!
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
