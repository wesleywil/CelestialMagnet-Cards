"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/redux/store";
import { signIn } from "@/redux/user/user";

export default function SignIn() {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await dispatch(signIn(formData));
    if (
      res.payload.hasOwnProperty("expiry") &&
      res.payload.hasOwnProperty("token")
    ) {
      localStorage.setItem("token", res.payload.token);
      localStorage.setItem("tokenExpiry", res.payload.expiry);
      window.location.href = "/mycards";
    }
    if (res.payload.non_field_errors) {
      setMessage("Username or Password incorrect!");
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };
  return (
    <main
      className="p-2 py-24 md:p-24 flex min-h-screen flex-col items-center 
        text-[#e6eeee] z-0"
    >
      <div className="my-2 w-24 h-1 bg-[#e05f5f]"></div>
      <div className="w-full xl:w-2/4 flex border rounded-xl overflow-hidden">
        <div
          style={{
            backgroundImage: `url("http://localhost:8000/images/card_bases/Mermaid.jpg")`,
            backgroundSize: "cover",
          }}
          className="hidden w-1/2 md:w-full xl:w-1/2 h-[60vh] md:flex flex-col items-center justify-center bg-[#e05f5f]"
        >
          <h1 className="w-full px-4 py-2 text-6xl bg-[#e05f5f]/70 backdrop-blur-sm	 text-[#1e2027] font-bold text-center">
            Welcome Back!
          </h1>
        </div>
        <form
          onSubmit={handleSignIn}
          className="w-full xl:w-1/2 h-[60vh] p-2 flex flex-col justify-center text-center md:text-left"
        >
          <h1 className=" text-3xl  font-bold">Login</h1>
          <span className="text-xs font-light text-gray-400">
            Welcome back! Plase login to your account
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
              className="px-2 py-1 bg-transparent text-center md:text-left border-b-2 border-[#e6eeee] focus:border-[#e05f5f] outline-0 transform duration-500 ease-in"
            />
            <input
              type="password"
              required
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="px-2 py-1 bg-transparent text-center md:text-left border-b-2 border-[#e6eeee] focus:border-[#e05f5f] outline-0 transform duration-500 ease-in"
            />
          </div>
          {message.length ? (
            <h2 className="w-full mb-2 text-[#e05f5f] text-sm text-center rounded">
              {message}
            </h2>
          ) : (
            ""
          )}
          <button className="px-2 py-2 text-2xl font-bold text-[#1e2027] hover:text-[#1e2027] bg-[#e05f5f] hover:bg-[#e6eeee] rounded transform duration-500 ease-in-out">
            Login
          </button>
        </form>
      </div>
      <div className="my-2 w-24 h-1 bg-[#e05f5f]"></div>
    </main>
  );
}
