import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Header from "@/pages/Layout/header";
import Link from "next/link";

export default function UpdateJob() {
  const router = useRouter();
  const id = router.query.id;

  const [register, setRegister] = useState({
    title: "",
    details: "",
  });

  useEffect(() => {
    const getData = async (id) => {
      try {
        const response = await axios.get("http://localhost:3000/hr/job/" + id, {
          withCredentials: true,
        });
        console.log(response);
        if (response.data) {
          setRegister({
            title: response.data.title,
            details: response.data.details,
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
        "http://localhost:3000/hr/job/" + id,
        {
          title: register.title,
          details: register.details,
        },
        {
          withCredentials: true,
        }
      );
      if (response.data) {
        setRegister({
          title: register.title,
          details: register.details,
        });
        console.log(response);
        console.log("Form submitted successfully");
        router.push("../readJobPost");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Header dashboard="All Job Post"></Header>
      <form
        className="w-full max-w-lg container mx-auto my-20"
        method="post"
        action=""
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          Title
        </label>
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          type="text"
          name="title"
          value={register.title}
          onChange={handleChange}
        />
        <br />

        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          Details
        </label>
        <textarea
          rows={10}
          className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          type="text"
          name="details"
          value={register.details}
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
