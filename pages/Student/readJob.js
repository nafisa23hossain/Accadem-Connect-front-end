import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Header from "../Layout/studentHeader";
import Footer from "../Layout/footer";

export default function ReadJob() {
  const [data, setData] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axios.get(`http://localhost:3000/student/alljob`, {
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

  const applyJob = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/student/apply/${id}`,
        {},
        {
          //   headers: { "Context-Type": "application/x-www-form-urlencoded" },
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

              <div className="card w-2/5 bg-white border border-black text-black-content">
                <div className="card-body">
                  <h1>Name: {d.title}</h1>
                  <p>Details: {d.details}</p>
                </div>

                <div className="card-actions justify-end">
                  <button
                    onClick={() => applyJob(d.id)}
                    className="btn bg-green-500 text-white m-10"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
      <Footer></Footer>
    </div>
  );
}
