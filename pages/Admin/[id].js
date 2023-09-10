import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

import Header from "../Layout/adminHeader";

export default function UpdateJob() {
  const router = useRouter();
  const id = router.query.id;

  const [register, setRegister] = useState({
    name: "",
    phone: "",
    email: "",
    gender: "",
    education: "",
  });

  useEffect(() => {
    const getData = async (id) => {
      try {
        const response = await axios.get(
          "http://localhost:3000/admin/moderator/" + id,
          {
            withCredentials: true,
          }
        );
        console.log(response);
        if (response.data) {
          setRegister({
            name: response.data.name,
            phone: response.data.phone,
            email: response.data.email,
            gender: response.data.gender,
            education: response.data.education,
          });
          //router.push("/Hr/readJobPost");
        }
      } catch (error) {
        console.log(error);
      }
    };
    getData(id);
  }, [id]);

  const handleChange = (e) => {
    setRegister({
      ...register,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        "http://localhost:3000/admin/moderator/" + id,
        {
          name: register.name,
          phone: register.phone,
          email: register.email,
          gender: register.gender,
          education: register.education,
        },
        {
          withCredentials: true,
        }
      );
      if (response.data) {
        setRegister({
          name: register.name,
          phone: register.phone,
          email: register.email,
          gender: register.gender,
          education: register.education,
        });
        console.log(response);
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
        className="w-full max-w-lg container mx-auto my-20"
        method="post"
        action=""
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          Name
        </label>
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          type="text"
          name="name"
          value={register.name}
          onChange={handleChange}
        />
        <br />

        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          Phone
        </label>
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          type="text"
          name="phone"
          value={register.phone}
          onChange={handleChange}
        />
        <br />

        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          Email
        </label>
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          type="text"
          name="email"
          value={register.email}
          onChange={handleChange}
        />
        <br />

        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          Gender
        </label>
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          type="text"
          name="gender"
          value={register.gender}
          onChange={handleChange}
        />
        <br />

        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          Education
        </label>
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          type="text"
          name="education"
          value={register.education}
          onChange={handleChange}
        />
        <br />

        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
