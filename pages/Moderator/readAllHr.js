import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Header from "../Layout/moderatorHeader";
import Link from "next/link";

export default function ReadJobPost() {
  const [data, setData] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axios.get(
          `http://localhost:3000/moderator/hrwithModerator/`,
          {
            withCredentials: true,
          }
        );
        setData(data.data[0].hrs);
        console.log(data.data[0].hrs);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  const deleteHr = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/moderator/hrwithmoderator/${id}`,
        {
          withCredentials: true,
        }
      );

      console.log(response);
      router.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Header></Header>
      <hr />
      <div className="pl-20">
        {data &&
          data.map((d) => (
            <div className=" flex  justify-center mt-2" key={d.id}>
              <hr />

              <div className="card w-2/4 bg-white-500 text-black-content border border-black ">
                <div className="card-body">
                  <h1>Name: {d.name}</h1>
                  <p>Phone: {d.phone}</p>
                  <p>Email: {d.email}</p>
                  <p>Gender: {d.gender}</p>

                  <div className="card-actions justify-end">
                    <button
                      onClick={() => deleteHr(d.id)}
                      className="btn bg-red-800 text-white"
                    >
                      Delete
                    </button>
                    <button className="btn bg-green-800 text-white">
                      <Link href={"/Moderator/" + d.id}>Hr Jobs</Link>
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
