import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Header from "../Layout/adminHeader";
import Link from "next/link";

export default function ReadModerator() {
  const [data, setData] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axios.get(`http://localhost:3000/admin/moderator/`, {
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

  const deleteModerator = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/admin/moderator/${id}`,
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

  const updateStatus = async (id) => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/admin/moderatorAccess/${id}`,
        {},
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

              <div className="card w-2/4 bg-white border border-cyan-700 text-black-500">
                <div className="card-body">
                  <h1>Name: {d.name}</h1>
                  <p>Phone: {d.phone}</p>
                  <p>Email: {d.email}</p>
                  <p>Gender: {d.gender}</p>
                  <p>Education: {d.education}</p>
                  <p>Status: {d.status}</p>

                  <div className="card-actions justify-end">
                    <button className="btn bg-green-500 text-white">
                      <Link href={"/Admin/" + d.id}>Update </Link>
                    </button>
                    <button
                      onClick={() => updateStatus(d.id)}
                      className="btn bg-red-800 text-white"
                    >
                      Status
                    </button>
                    <button
                      onClick={() => deleteModerator(d.id)}
                      className="btn bg-red-800 text-white"
                    >
                      Delete
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
