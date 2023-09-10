// name,
//           phone,
//           email,
//           gender,
//           age,
//           password,
//           education,
//           myfile,

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Header from "../Layout/adminHeader";

export default function Register() {
  const router = useRouter();

  const [register, setRegister] = useState({
    name: "",
    phone: "",
    email: "",
    gender: "",
    age: "",
    password: "",
    education: "",
    myfile: null,
  });
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    email: "",
    gender: "",
    age: "",
    password: "",
    education: "",
    myfile: "",
  });

  const handleChange = (e) => {
    if (e.target.name === "myfile") {
      setRegister({
        ...register,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setRegister({
        ...register,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!register.name) {
      newErrors.name = "Name is required";
    }
    if (!register.phone) {
      newErrors.phone = "Phone is required";
    }
    if (!register.email) {
      newErrors.email = "Email is required";
    }
    if (!register.gender) {
      newErrors.gender = "Gender is required";
    }
    if (!register.age) {
      newErrors.age = "Age is required";
    }
    if (!register.education) {
      newErrors.education = "Education is required";
    }
    if (!register.password) {
      newErrors.password = "Password is required";
    }
    if (!register.myfile) {
      newErrors.myfile = "Image is required";
    }

    // if (Object.keys(newErrors).length > 0) {

    //   setErrors(newErrors);
    //   return;
    // }
    try {
      const response = await axios.post(
        "http://localhost:3000/admin/addModerator",
        {
          name: register.name,
          phone: register.phone,
          email: register.email,
          gender: register.gender,
          age: register.age,
          password: register.password,
          education: register.education,
          myfile: register.myfile,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (response.data) {
        setRegister({
          name: "",
          phone: "",
          email: "",
          gender: "",
          age: "",
          password: "",
          education: "",
          myfile: null,
        });
        console.log("Form submitted successfully");
        router.push("/Admin/readModerator");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Header></Header>
      <form
        method="post"
        onSubmit={handleSubmit}
        className="w-full max-w-lg container mx-auto my-5"
      >
        <div className="flex flex-wrap -mx-3 mb-4">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold">
            Name
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
            type="text"
            name="name"
            value={register.name}
            onChange={handleChange}
          />
          {errors.name && <p className="text-red-500">{errors.name}</p>}
          <br />
        </div>

        <div className="mb-4 flex flex-wrap -mx-3 ">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold ">
            Phone
          </label>
          <input
            type="text"
            name="phone"
            value={register.phone}
            onChange={handleChange}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
          />
          {errors.phone && <p className="text-red-500">{errors.phone}</p>}
          <br />
        </div>

        <div className="mb-4 flex flex-wrap -mx-3 mb-6">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold ">
            Email
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
            type="email"
            name="email"
            value={register.email}
            onChange={handleChange}
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
          <br />
        </div>

        <div className="mb-4 flex flex-wrap -mx-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold">
            Gender
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
            type="text"
            name="gender"
            value={register.gender}
            onChange={handleChange}
          />
          {errors.gender && <p className="text-red-500">{errors.gender}</p>}
          <br />
        </div>

        <div className="mb-4 flex flex-wrap -mx-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold ">
            Password
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
            type="password"
            name="password"
            value={register.password}
            onChange={handleChange}
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}
          <br />
        </div>

        <div className="mb-4 flex flex-wrap -mx-3 ">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold ">
            Age
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
            type="text"
            name="age"
            value={register.age}
            onChange={handleChange}
          />
          {errors.age && <p className="text-red-500">{errors.age}</p>}
          <br />
        </div>

        <div className="mb-4 flex flex-wrap -mx-3 ">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold">
            Education
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
            type="text"
            name={register.education}
            onChange={handleChange}
          />
          {errors.myfile && <p className="text-red-500">{errors.myfile}</p>}
          <br />
        </div>

        <div className="mb-4 flex flex-wrap -mx-3 ">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold">
            Image
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
            type="file"
            name="myfile"
            onChange={handleChange}
          />
          {errors.myfile && <p className="text-red-500">{errors.myfile}</p>}
          <br />
        </div>

        <button className="mr-5 btn btn-primary" type="submit">
          Submit
        </button>

        {/* <button className="btn btn-primary">
          <Link href="/Hr/login">Back</Link>
        </button> */}
      </form>
    </div>
  );
}
