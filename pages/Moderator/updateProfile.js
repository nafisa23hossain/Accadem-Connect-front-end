import { useRouter } from "next/router";
import Header from "../Layout/moderatorHeader";
import { useEffect, useState } from "react";
import axios from "axios";

export default function EditProfile() {
  const router = useRouter();

  const [register, setRegister] = useState({
    name: "",
    phone: "",
    gender: "",
    age: "",
    education: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    gender: "",
    age: "",
    education: "",
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
    if (!register.name) {
      newErrors.name = "Name is required";
    }
    if (!register.phone) {
      newErrors.phone = "Phone is required";
    } else if (register.phone.length < 11) {
      newErrors.phone = "Phone number must be at least 11 characters";
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

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.put(
        "http://localhost:3000/moderator/updateprofile/",
        {
          name: register.name,
          phone: register.phone,
          gender: register.gender,
          age: register.age,
          education: register.education,
        },
        {
          withCredentials: true,
        }
      );
      if (response.data) {
        console.log("Form submitted successfully");
        router.push("/Moderator/myProfile");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "http://localhost:3000/moderator/myprofile/",
          {
            withCredentials: true,
          }
        );
        const jsonData = response.data;
        console.log(jsonData);
        setRegister(jsonData);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <Header></Header>
      <form
        method="post"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="w-full max-w-lg container mx-auto my-20"
      >
        <div className="flex flex-wrap -mx-3 mb-6">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={register.name}
            onChange={handleChange}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          />
          {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
          <br />
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Phone
          </label>
          <input
            type="text"
            name="phone"
            value={register.phone}
            onChange={handleChange}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          />
          {errors.phone && <p style={{ color: "red" }}>{errors.phone}</p>}
          <br />
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Gender
          </label>
          <input
            type="text"
            name="gender"
            value={register.gender}
            onChange={handleChange}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          />
          {errors.gender && <p style={{ color: "red" }}>{errors.gender}</p>}
          <br />
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Age
          </label>
          <input
            type="text"
            name="age"
            value={register.age}
            onChange={handleChange}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          />
          {errors.age && <p style={{ color: "red" }}>{errors.age}</p>}
          <br />
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Education
          </label>
          <input
            type="text"
            name="education"
            value={register.education}
            onChange={handleChange}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          />
          {errors.education && (
            <p style={{ color: "red" }}>{errors.education}</p>
          )}
          <br />
        </div>

        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
