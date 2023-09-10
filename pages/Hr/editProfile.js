// import { useRouter } from "next/router";
// import Header from "../Layout/header";
// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function EditProfile() {
//   const router = useRouter();

//   const [register, setRegister] = useState({
//     name: "",
//     phone: "",
//     gender: "",
//     age: "",
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
//       const response = await axios.put(
//         "http://localhost:3000/hr/updateprofile/",
//         {
//           name: register.name,
//           phone: register.phone,
//           gender: register.gender,
//           age: register.age,
//         },
//         {
//           withCredentials: true,
//         }
//         // {
//         //   headers: { "Context-Type": "application/x-www-form-urlencoded" },
//         //   withCredentials: true,
//         // }
//       );
//       if (response.data) {
//         console.log("Form submitted successfully");
//         router.push("/Hr/myProfile");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const response = await axios.get(
//           "http://localhost:3000/hr/myprofile/",
//           {
//             withCredentials: true,
//           }
//         );
//         const jsonData = response.data;
//         console.log(jsonData);
//         setRegister(jsonData);
//       } catch (error) {
//         console.error(error);
//       }
//     }
//     fetchData();
//   }, []);

//   return (
//     <div>
//       <Header></Header>
//       <form method="post" onSubmit={handleSubmit} encType="multipart/form-data">
//         <div>
//           <label>Name</label>
//           <input
//             type="text"
//             name="name"
//             value={register.name}
//             onChange={handleChange}
//           />
//           <br />
//         </div>

//         <div>
//           <label>Phone</label>
//           <input
//             type="text"
//             name="phone"
//             value={register.phone}
//             onChange={handleChange}
//           />
//           <br />
//         </div>

//         {/* <div>
//           <label>Email</label>
//           <input
//             type="email"
//             name="email"
//             value={register.email}
//             onChange={handleChange}
//           />
//           <br />
//         </div> */}

//         <div>
//           <label>Gender</label>
//           <input
//             type="text"
//             name="gender"
//             value={register.gender}
//             onChange={handleChange}
//           />
//           <br />
//         </div>

//         {/* <div>
//           <label>Password</label>
//           <input
//             type="password"
//             name="password"
//             value={register.password}
//             onChange={handleChange}
//           />
//           <br />
//         </div> */}

//         <div>
//           <label>Age</label>
//           <input
//             type="text"
//             name="age"
//             value={register.age}
//             onChange={handleChange}
//           />
//           <br />
//         </div>
//         {/*
//         <div>
//           <label>Image</label>
//           <input type="file" name="myfile" onChange={handleChange} />
//           <br />
//         </div> */}

//         <button type="submit">Submit</button>
//       </form>

//       <style jsx>{`
//         button {
//           color: white;
//           background: black;
//         }
//         input {
//           border-radius: 5px;
//         }
//         label {
//           padding: 30px;
//         }
//         div {
//           padding: 30px;
//         }
//       `}</style>
//     </div>
//   );
// }

/////////2nd?//////////
import { useRouter } from "next/router";
import Header from "../Layout/header";
import { useEffect, useState } from "react";
import axios from "axios";

export default function EditProfile() {
  const router = useRouter();

  const [register, setRegister] = useState({
    name: "",
    phone: "",
    gender: "",
    age: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    gender: "",
    age: "",
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

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.put(
        "http://localhost:3000/hr/updateprofile/",
        {
          name: register.name,
          phone: register.phone,
          gender: register.gender,
          age: register.age,
        },
        {
          withCredentials: true,
        }
      );
      if (response.data) {
        console.log("Form submitted successfully");
        router.push("/Hr/myProfile");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "http://localhost:3000/hr/myprofile/",
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

        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>

      {/* <style jsx>{`
        button {
          color: white;
          background: black;
        }
        input {
          border-radius: 5px;
        }
        label {
          padding: 30px;
        }
        div {
          padding: 30px;
        }
      `}</style> */}
    </div>
  );
}
