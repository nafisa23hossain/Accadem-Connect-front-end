import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import Header from "../Layout/header";

export default function ReadJobPost() {
  const [data, setData] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axios.get(`http://localhost:3000/Hr/allJob/`, {
          withCredentials: true,
        });
        setData(data.data);
        console.log(data);
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
          <div className=" flex  justify-center" key={d.id}>
            {/* <h4>Title: {d.title}</h4>
            <p>Title: {d.details}</p>
            <p>Updated: {d.updatedDate}</p> */}
            {/* <Link href={"/Hr/Details/" + d.id}>Details</Link> */}

            <hr />
            <div class="w-2/4 rounded overflow-hidden shadow-lg py-5">
              <div class="px-6 py-4">
                <div class="font-bold text-xl mb-2">{d.title}</div>
                <p class="text-gray-700 text-base">{d.details}</p>
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
            </div>
          </div>
        ))}
    </div>
  );
}
