import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Header from "../Layout/studentHeader";

export default function MyPost() {
  const [data, setData] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axios.get(`http://localhost:3000/student/allPost/`, {
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
      <div className="pl-20">
        {data &&
          data.map((d) => (
            <div className=" flex  justify-center mt-2" key={d.id}>
              <hr />

              <div className="card w-2/5 bg-white border border-black text-black-content">
                <div className="card-body">
                  <h1>Name: {d.title}</h1>
                  <p>Details: {d.details}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
