// import React, { useState } from "react";
// import axios from "axios";
// import { useRouter } from "next/router";
// import Header from "../Layout/header";

// export default function CreateJob() {
//   const router = useRouter();

//   const [register, setRegister] = useState({
//     title: "",
//     details: "",
//   });

//   const handleChange = (e) => {
//     setRegister({
//       ...register,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         "http://localhost:3000/hr/job",
//         {
//           title: register.title,
//           details: register.details,
//         },
//         {
//           // headers: { "Context-Type": "application/x-www-form-urlencoded" },
//           withCredentials: true,
//         }
//       );
//       if (response.data) {
//         setRegister({
//           title: "",
//           details: "",
//         });
//         console.log("Form submitted successfully");
//         router.push("/Hr/readJobPost");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div>
//       <Header></Header>
//       <form
//         method="post"
//         action=""
//         onSubmit={handleSubmit}
//         encType="multipart/form-data"
//       >
//         <label>Title</label>
//         <input
//           type="text"
//           name="title"
//           value={register.title}
//           onChange={handleChange}
//         />
//         <br />

//         <label>Details</label>
//         <input
//           type="text"
//           name="details"
//           value={register.details}
//           onChange={handleChange}
//         />
//         <br />

//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// }

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Header from "../Layout/header";

export default function CreateJob() {
  const router = useRouter();

  const [register, setRegister] = useState({
    title: "",
    details: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    details: "",
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
    if (!register.title) {
      newErrors.title = "Title is required";
    }
    if (!register.details) {
      newErrors.details = "Details are required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/hr/job",
        {
          title: register.title,
          details: register.details,
        },
        {
          // headers: { "Context-Type": "application/x-www-form-urlencoded" },
          withCredentials: true,
        }
      );
      if (response.data) {
        setRegister({
          title: "",
          details: "",
        });
        console.log("Form submitted successfully");
        router.push("/Hr/readJobPost");
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
        <div className="flex flex-wrap -mx-3 mb-6">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Title
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            type="text"
            name="title"
            placeholder="Title..."
            value={register.title}
            onChange={handleChange}
          />
        </div>

        {errors.title && <p style={{ color: "red" }}>{errors.title}</p>}
        <br />
        <div className="flex flex-wrap -mx-3 mb-6">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Details
          </label>
          <textarea
            rows={10}
            cols={10}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            type="text"
            placeholder="Details..."
            name="details"
            value={register.details}
            onChange={handleChange}
          />
        </div>

        {errors.details && <p style={{ color: "red" }}>{errors.details}</p>}
        <br />

        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
