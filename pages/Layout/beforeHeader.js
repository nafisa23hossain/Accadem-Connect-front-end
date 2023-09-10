import React from "react";
import Link from "next/link";

export default function BeforeHeader() {
  return (
    <div>
      <nav>
        <div class="container mx-auto px-6 py-2 flex justify-between items-center">
          <Link class="font-bold text-2xl lg:text-4xl" href="/">
            ACCADEMCONNECT
          </Link>
          <div class="block lg:hidden">
            <button class="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-gray-800 hover:border-teal-500 appearance-none focus:outline-none">
              <svg
                class="fill-current h-3 w-3"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </button>
          </div>
          <div class="hidden lg:block">
            <ul class="inline-flex">
              {/* <li>
                    <a class="px-4 font-bold" href="/">
                      Home
                    </a>
                  </li>
                  <li>
                    <a class="px-4 hover:text-gray-800" href="#">
                      Admin
                    </a>
                  </li>
                  <li>
                    <a class="px-4 hover:text-gray-800" href="#">
                      Hr
                    </a>
                  </li> */}
              <button className="btn btn-primary mx-2">
                <Link className="flex-1" href="/Admin/login">
                  Admin
                </Link>
              </button>

              <button className="btn btn-primary mx-2">
                <Link className="flex-1" href="/Moderator/login">
                  Moderator
                </Link>
              </button>
              <button className="btn btn-primary mx-2">
                <Link className="flex-1" href="/Hr/login">
                  Hr
                </Link>
              </button>
              <button className="btn btn-primary mx-2">
                <Link className="flex-1" href="/Student/login">
                  Student
                </Link>
              </button>

              {/* <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                      <div className="w-10 rounded-full">
                        <img src="http://localhost:3000/hr/getimage/" />
                      </div>
                    </label>
    
                    <ul
                      tabIndex={0}
                      className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                    >
                      <li>
                        <Link className="justify-between" href="/Hr/myProfile">
                          My profile
                        </Link>
                      </li>
                      <li>
                        <Link className="justify-between" href="/Hr/deleteProfile">
                          Delete Profile
                        </Link>
                      </li>
                      <li>
                        <button type="submit">Logout</button>
                      </li>
                    </ul>
                  </div> */}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
