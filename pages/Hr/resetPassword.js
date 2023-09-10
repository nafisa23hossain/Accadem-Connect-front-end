// import { useRouter } from "next/router";
// import { useState } from "react";
// import axios from "axios";

// export default function Resetmail() {
//   const router = useRouter();
//   const [email, setEmail] = useState("");

//   const handleChange = (e) => {
//     setEmail(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:3000/hr/sentmail", {
//         email: email,
//       });
//       router.push("/Hr/forgetPassword");
//       if (response.data) {
//         setEmail("");
//         console.log("Form submitted successfully");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div>
//       <br />
//       <form onSubmit={handleSubmit}>
//         <label>Gmail</label>
//         <input
//           type="email"
//           name="email"
//           placeholder="Gmail..."
//           value={email}
//           onChange={handleChange}
//         />
//         <br />

//         <button type="submit">Submit</button>
//       </form>
//       <br />
//     </div>
//   );
// }

import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import Footer from "../Layout/footer";
import BeforeHeader from "../Layout/beforeHeader";

export default function Resetmail() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/hr/sentmail", {
        email: email,
      });
      router.push("/Hr/forgetPassword");
      if (response.data) {
        setEmail("");
        console.log("Form submitted successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <BeforeHeader></BeforeHeader>
      <br />
      <form
        className="w-full max-w-lg container mx-auto my-20"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-wrap -mx-3 mb-6">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Gmail
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            type="email"
            name="email"
            placeholder="Gmail..."
            value={email}
            onChange={handleChange}
          />
          {error && <p className="text-red-500">{error}</p>}
          <br />
        </div>

        <button className="mr-5 btn btn-secondary" type="submit">
          Submit
        </button>
        <button className="btn btn-primary">
          <Link href="/Hr/login">Back</Link>
        </button>
      </form>
      <br />
      <Footer></Footer>
    </div>
  );
}
