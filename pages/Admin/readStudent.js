import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Header from "../Layout/adminHeader";

export default function ReadJobPost() {
  const [data, setData] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axios.get(`http://localhost:3000/admin/student/`, {
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

              <div className="card w-2/4 bg-white-500 border text-black-500">
                <div className="card-body">
                  <h1>Name: {d.name}</h1>
                  <p>Phone: {d.phone}</p>
                  <p>Email: {d.email}</p>
                  <p>Gender: {d.gender}</p>

                  {/* <div className="card-actions justify-end">
                    <button className="btn">Buy Now</button>
                  </div> */}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
