import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Header from "../Layout/studentHeader";
import Link from "next/link";

export default function MyPost() {
  const [data, setData] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axios.get(`http://localhost:3000/student/mypost/`, {
          withCredentials: true,
        });
        setData(data.data[0].posts);
        console.log(data.data[0].posts);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  const deletePost = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/student/post/${id}`,
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

              <div className="card w-2/4 bg-white  border border-black text-black-content">
                <div className="card-body">
                  <h1>Name: {d.title}</h1>
                  <p>Details: {d.details}</p>

                  <div className="card-actions justify-end">
                    <button className="btn bg-green-500 text-white">
                      <Link href={"/Student/" + d.id}>Update </Link>
                    </button>

                    <button
                      onClick={() => deletePost(d.id)}
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
