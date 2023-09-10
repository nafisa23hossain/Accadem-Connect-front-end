import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Header from "../Layout/moderatorHeader";
import Link from "next/link";

export default function MyPost() {
  const [data, setData] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axios.get(
          `http://localhost:3000/moderator/report/`,
          {
            withCredentials: true,
          }
        );
        setData(data.data);
        console.log(data.data);
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
      <div className="pl-20">
        {data &&
          data.map((d) => (
            <div className=" flex  justify-center mt-2" key={d.id}>
              <hr />

              <div className="card w-96 bg-primary text-primary-content">
                <div className="card-body">
                  <h1>Title: {d.title}</h1>
                  <p>Details: {d.details}</p>

                  <div className="card-actions justify-end">
                    <button className="btn bg-red-800 text-white">
                      <Link href={"/Moderator/" + d.id}>Update</Link>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
