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
        "http://localhost:3000/moderator/login",
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

        router.push("/Moderator/myProfile");
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
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          method="post"
          action=""
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="email"
              value={register.email}
              onChange={handleChange}
            />
            {errors.email && <p className="text-danger">{errors.email}</p>}
            <br />
          </div>

          <div className="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              name="password"
              value={register.password}
              onChange={handleChange}
            />
            {errors.password && (
              <p className="text-danger">{errors.password}</p>
            )}
            <br />
          </div>

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
          <Link
            className="inline-block align-baseline font-bold text-sm text-red-500 hover:text-black-800 px-1"
            href="/Moderator/resetPassword"
          >
            Forgot Password?
          </Link>
          <Link
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 px-1"
            href="/Moderator/register"
          >
            Register Here
          </Link>
        </form>
        {notfound && (
          <h2 className="pl-2 text-red-800 font-bold">Not found any user</h2>
        )}
      </div>
      <Footer></Footer>
    </>
  );
}
