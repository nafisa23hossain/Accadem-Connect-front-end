import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Header from "../Layout/header";
import { useAuth } from "../lib/authContext";
import Link from "next/link";
import BeforeHeader from "../Layout/beforeHeader";
import Footer from "../Layout/footer";

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();
  const [notfound, setNotfound] = useState(false);

  const [register, setRegister] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setRegister({
      ...register,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    const newErrors = {};
    if (!register.email) {
      newErrors.email = "Email is required";
    }
    if (!register.password) {
      newErrors.password = "Password is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/admin/login",
        {
          email: register.email,
          password: register.password,
        },
        {
          headers: { "Context-Type": "application/x-www-form-urlencoded" },
          withCredentials: true,
        }
      );
      if (response.data) {
        console.log(response.data);
        console.log(document.cookie);
        login(register.email, document.cookie);
        console.log("Login successful");

        router.push("/Admin/myProfile");
      }
    } catch (error) {
      setNotfound(true);
      console.log(error);
    }
  };

  return (
    <>
      <BeforeHeader></BeforeHeader>
      <div className="h-screen flex items-center justify-center ">
        <form
          class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              name="email"
              value={register.email}
              onChange={handleChange}
              placeholder="Username"
            ></input>
          </div>
          <div class="mb-6">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              class="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              name="password"
              type="password"
              onChange={handleChange}
              value={register.password}
              placeholder="******************"
            ></input>
          </div>
          <div class="flex items-center justify-between">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
            <Link
              class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="/Admin/resetPassword"
            >
              Forgot Password?
            </Link>
          </div>
        </form>

        {notfound && (
          <h2 className="pl-2 text-red-800 font-bold">Not found any user</h2>
        )}
      </div>
      <Footer></Footer>
    </>
  );
}
