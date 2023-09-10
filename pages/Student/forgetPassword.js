import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
import BeforeHeader from "../Layout/beforeHeader";
import Footer from "../Layout/footer";

export default function ForgetPassword() {
  const router = useRouter();

  const [register, setRegister] = useState({
    otp: "",
    newPassword: "",
  });

  const [errors, setErrors] = useState({
    otp: "",
    newPassword: "",
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
    if (!register.otp) {
      newErrors.otp = "OTP is required";
    }
    if (!register.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (register.newPassword.length < 7) {
      newErrors.newPassword = "New password must be at least 7 characters";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.patch(
        "http://localhost:3000/student/forgetPassword/",
        {
          otp: register.otp,
          newPassword: register.newPassword,
        }
        // {
        //   headers: { "Context-Type": "application/x-www-form-urlencoded" },
        //   withCredentials: true,
        // }
      );
      if (response.data) {
        console.log("Form submitted successfully");
        router.push("/Student/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <BeforeHeader></BeforeHeader>
      <form
        className="w-full max-w-lg container mx-auto my-20"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-wrap -mx-3 mb-6">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Otp
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            type="text"
            name="otp"
            value={register.otp}
            onChange={handleChange}
          />
          {errors.otp && <p className="text-red-500">{errors.otp}</p>}
          <br />
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Password
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            type="password"
            name="newPassword"
            value={register.newPassword}
            onChange={handleChange}
          />
          {errors.newPassword && (
            <p className="text-red-500">{errors.newPassword}</p>
          )}
          <br />
        </div>
        <br />

        <button
          className="bg-black text-white font-semibold py-2 px-4 rounded-lg"
          type="submit"
        >
          Submit
        </button>
      </form>
      <Footer></Footer>
    </div>
  );
}
