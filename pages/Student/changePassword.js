import { useState } from "react";
import Header from "../Layout/studentHeader";
import axios from "axios";
import { useRouter } from "next/router";

export default function ChangePassword() {
  const router = useRouter();
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const [errors, setErrors] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (password.oldPassword.length < 7) {
      newErrors.oldPassword = "Old password must be at least 7 characters";
    }
    if (password.newPassword.length < 7) {
      newErrors.newPassword = "New password must be at least 7 characters";
    }
    if (password.oldPassword === password.newPassword) {
      newErrors.newPassword =
        "New password must be different from old password";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.patch(
        "http://localhost:3000/student/changePassword",
        {
          oldPassword: password.oldPassword,
          newPassword: password.newPassword,
        },
        {
          // headers: { "Context-Type": "application/x-www-form-urlencoded" },
          withCredentials: true,
        }
      );
      if (response.data) {
        setPassword({
          oldPassword: "",
          newPassword: "",
        });
        console.log("Form submitted successfully");
        router.push("/Student/myProfile");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Header></Header>
      <br />
      <form
        className="w-full max-w-lg container mx-auto my-20"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-wrap -mx-0 mb-6">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Old Password
          </label>
          <input
            type="password"
            name="oldPassword"
            placeholder="Old Password..."
            value={password.oldPassword}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            onChange={handleChange}
          />
        </div>

        <br />
        {errors.oldPassword && (
          <p style={{ color: "red" }}>{errors.oldPassword}</p>
        )}
        <div lassName="flex flex-wrap -mx-3 mb-6">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            New Password
          </label>
          <input
            type="password"
            name="newPassword"
            placeholder="New Password..."
            value={password.newPassword}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            onChange={handleChange}
          />
        </div>

        <br />
        {errors.newPassword && (
          <p style={{ color: "red" }}>{errors.newPassword}</p>
        )}

        <br />
        <br />
        <button className="btn btn-secondary" type="submit">
          Submit
        </button>
      </form>
      <br />
    </div>
  );
}
