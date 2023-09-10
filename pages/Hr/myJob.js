import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import Header from "../Layout/header";

export default function MyJobPost() {
  const [data, setData] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axios.get(`http://localhost:3000/Hr/myjob/`, {
          headers: { "Context-Type": "application/x-www-form-urlencoded" },
          withCredentials: true,
        });
        console.log(data.data[0].jobs);
        setData(data.data[0].jobs);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  return (
    <div>
      <Header></Header>
      <hr />

      {data &&
        data.map((d) => (
          <div key={d.id} className=" flex  justify-center ">
            <hr />

            <div class="w-1/3 rounded overflow-hidden shadow-lg py-5">
              <div class="px-6 py-4">
                <div class="font-bold text-xl mb-2">{d.title}</div>
              </div>

              <div class="px-6 pt-4 pb-2">
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  #Hr
                </span>
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  #Student Forum
                </span>
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  #Connected
                </span>
              </div>
              <div class="px-6 pt-4 pb-2">
                <button className="btn btn-primary">
                  <Link href={"/Hr/Details/" + d.id}>Details</Link>
                </button>

                <button className="ml-3 btn btn-primary">
                  <Link href={"/Hr/Candidate/" + d.id}>Candidate</Link>
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
