import Image from "next/image";
import { Inter } from "next/font/google";
import Layout from "./Layout/layout";
import ChangePassword from "./Admin/changepassword";
import Link from "next/link";
import Footer from "./Layout/footer";
import BeforeHeader from "./Layout/beforeHeader";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      {/* Navbar */}
      <BeforeHeader></BeforeHeader>
      {/* End of navbar */}

      <div
        class="py-20 conatiner"
        style={{
          background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        <div class="container mx-auto mx-auto px-6">
          <h2 class="text-4xl font-bold mb-2 text-white">
            Welcome to your professional community
          </h2>
          <h3 class="text-2xl mb-8 text-gray-200">
            Join your colleagues, classmates, and friends on AccademConnect.
          </h3>

          <button class="bg-white font-bold rounded-full py-4 px-8 shadow-lg uppercase tracking-wider">
            Get Started
          </button>
        </div>
      </div>

      {/* Dunno */}
      <section class="bg-gray-100">
        <div class="container mx-auto px-6 py-20">
          <h2 class="text-4xl font-bold text-center text-gray-800 mb-8">
            Explore with us
          </h2>
          <div class="flex flex-wrap">
            <div class="w-full md:w-1/3 px-2 mb-4">
              <div class="bg-white rounded shadow py-2">
                <p class="text-gray-800 text-base px-6 mb-5">
                  With the Open To Work feature, you can privately tell
                  recruiters or publicly share with the LinkedIn community that
                  you are looking for new job opportunities.
                </p>
              </div>
            </div>
            <div class="w-full md:w-1/3 px-2 mb-4">
              <div class="bg-white rounded shadow py-2">
                <p class="text-gray-800 text-base px-6 mb-5">
                  Sending messages to people you know is a great way to
                  strengthen relationships as you take the next step in your
                  career.
                </p>
              </div>
            </div>
            <div class="w-full md:w-1/3 px-2 mb-4">
              <div class="bg-white rounded shadow py-2">
                <p class="text-gray-800 text-base px-6 mb-5">
                  From live videos, to stories, to newsletters and more,
                  LinkedIn is full of ways to stay up to date on the latest
                  discussions in your industry.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer></Footer>

      {/* <Layout> */}
      {/* <Link href="/Hr/changePassword">Change Password</Link>
      <br />
      <Link href="/Hr/createJob">Create Job</Link>
      <br />
      <Link href="/Hr/deleteJobPost">Delete job Post</Link>
      <br />
      <Link href="/Hr/deleteProfile">delete Profile</Link>

      <br />
      <Link href="/Hr/editProfile">Update Profile</Link>

      <br />
      <Link href="/Hr/login">Login</Link>

      <br />
      <Link href="/Hr/logout">Logout</Link>

      <br />
      <Link href="/Hr/myProfile">My profile</Link>

      <br />
      <Link href="/Hr/readDetailsJob">Read Details Job</Link>

      <br />
      <Link href="/Hr/readJobPost">Read Job Post</Link>

      <br />
      <Link href="/Hr/register">Register</Link>

      <br />
      <Link href="/Hr/resetPassword">Reset Password</Link>

      <br />
      <Link href="/Hr/updateJobPost">Update Job Post</Link> */}

      {/* </Layout> */}
    </div>
  );
}
