import { useEffect, useState } from "react";
import { useAuth } from "../lib/authContext";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";

export default function Header() {
  const [jsonData, setJsonData] = useState("");
  const router = useRouter();
  const { user, setUser, logout, checkUser } = useAuth();

  useEffect(() => {
    fetchData();
  }, []);

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
      setJsonData(jsonData);
    } catch (error) {
      router.push("../Moderator/login");
      console.error(error);
    }
  }

  const handleLogout = async () => {
    //logout();
    try {
      const response = await axios.get(
        "http://localhost:3000/moderator/logout",
        {
          // headers: { "Content-Type": "application/x-www-form-urlencoded" },
          withCredentials: true,
        }
      );
      console.log(response);
      setUser(null);
      document.cookie = null;

      router.push("../Moderator/login");
    } catch (error) {
      console.error("error failed: ", error);
    }
  };

  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link className="btn btn-ghost normal-case text-xl" href="/">
            AccademConnect
          </Link>
        </div>

        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <button className="btn btn-primary mx-5">
              <Link className="flex" href="/Moderator/changePassword">
                Change Password
              </Link>
            </button>
            <button className="btn btn-primary mx-5">
              <Link className="flex" href="/Moderator/createHr">
                Create Hr
              </Link>
            </button>
            <button className="btn btn-primary mx-5">
              <Link className="flex" href="/Moderator/updateProfile">
                Update Profile
              </Link>
            </button>
            <button className="btn btn-primary mx-5">
              <Link className="flex-1" href="/Moderator/readAllHr">
                All Hr
              </Link>
            </button>
            <button className="btn btn-primary mx-5">
              <Link className="flex-1" href="/Moderator/readAllPost">
                All Post
              </Link>
            </button>

            {/* <button className="btn btn-primary mx-5">
              <Link className="flex-1" href="/Student/readPost">
                All Post
              </Link>
            </button> */}
          </ul>
        </div>

        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src="http://localhost:3000/moderator/getimage/" />
              </div>
            </label>

            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <Link className="justify-between" href="/Moderator/myProfile">
                  My profile
                </Link>
              </li>
              <li>
                <Link
                  className="justify-between"
                  href="/Moderator/deleteProfile"
                >
                  Delete profile
                </Link>
              </li>
              <li>
                <button type="submit" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
