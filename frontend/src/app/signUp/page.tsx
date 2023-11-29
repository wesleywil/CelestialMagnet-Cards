"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/redux/store";
import { signUp } from "@/redux/user/user";

export default function SignUp() {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordMatch, setpasswordMatch] = useState(true);
  const [message, setMessage] = useState("");

  const handleMessage = (message: string, time: number) => {
    setMessage(message);
    setTimeout(() => {
      setMessage("");
    }, time);
  };
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password === formData.confirmPassword) {
      const res = await dispatch(signUp(formData));
      console.log("RES => ", res);
      if (
        res.payload.hasOwnProperty("token") &&
        res.payload.hasOwnProperty("user")
      ) {
        window.location.href = "/signIn";
      }
      if (res.payload.hasOwnProperty("username")) {
        handleMessage("Username taken, choose another one!", 3000);
      }
      if (res.payload.password) {
        handleMessage(
          "Password is too short, too common or it's entirely numeric, please make a strong password with at least 8 characteres",
          5000
        );
      }
    } else {
      // Passwords don't match
      setpasswordMatch(false);
      setTimeout(() => {
        setpasswordMatch(true);
      }, 3000);
    }
  };
  return (
    <main
      className="p-2 py-24 md:p-24 flex min-h-screen flex-col items-center 
      text-[#fcfcfa] z-0"
    >
      <div className="my-2 w-24 h-1 bg-[#7bc6a2]"></div>
      <div className="w-full xl:w-2/4 flex border rounded-xl overflow-hidden">
        <div className="hidden w-1/2 md:w-full xl:w-1/2 h-[60vh] p-4 md:flex flex-col items-center justify-center bg-[#7bc6a2]">
          <h1 className="flex flex-col text-[#262c35] text-6xl font-bold text-center">
            <span>Collect</span>
            <span>Trade</span>
            <span>Conquer!</span>
          </h1>
        </div>
        <form
          onSubmit={handleRegister}
          className="w-full xl:w-1/2 h-[60vh] p-2 flex flex-col justify-center text-center md:text-left"
        >
          <h1 className=" text-3xl  font-bold">Register</h1>
          <span className="text-xs font-light text-gray-400">
            Welcome! Register your account here
          </span>
          <div className="py-4 flex flex-col gap-8 ">
            <input
              type="text"
              required
              placeholder="Enter your username"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              className="px-2 py-1 bg-transparent text-center md:text-left border-b-2 border-[#fcfcfa] focus:border-[#7bc6a2] outline-0 transform duration-500 ease-in"
            />
            <input
              type="email"
              required
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="px-2 py-1 bg-transparent text-center md:text-left border-b-2 border-[#fcfcfa] focus:border-[#7bc6a2] outline-0 transform duration-500 ease-in"
            />
            <input
              type="password"
              required
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="px-2 py-1 bg-transparent text-center md:text-left border-b-2 border-[#fcfcfa] focus:border-[#7bc6a2] outline-0 transform duration-500 ease-in"
            />
            <input
              type="password"
              required
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              className="px-2 py-1 bg-transparent text-center md:text-left border-b-2 border-[#fcfcfa] focus:border-[#7bc6a2] outline-0 transform duration-500 ease-in"
            />
          </div>
          {message.length ? (
            <h2 className="w-full mb-2 text-[#7bc6a2] text-sm text-center rounded">
              {message}
            </h2>
          ) : (
            ""
          )}
          <button className="px-2 py-1 text-xl font-bold hover:text-[#262c35] bg-[#7bc6a2] hover:bg-[#fcfcfa] rounded transform duration-500 ease-in-out">
            Register
          </button>
        </form>
      </div>
      <div className="my-2 w-24 h-1 bg-[#7bc6a2]"></div>
    </main>
  );
}
