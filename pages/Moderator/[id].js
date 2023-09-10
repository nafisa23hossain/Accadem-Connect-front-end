import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import Header from "../Layout/moderatorHeader";

export default function ReadHrJobs() {
  const [data, setData] = useState([]);

  const router = useRouter();
  const id = router.query.id;

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axios.get(
          `http://localhost:3000/Moderator/hrJobs/${id}`,
          {
            withCredentials: true,
          }
        );
        setData(data.data[0].jobs);
        console.log(data.data[0].jobs);
      } catch (error) {
        console.error(error);
      }
    };
    getData(id);
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
            <div class="w-2/4 rounded overflow-hidden border my-2 py-5">
              <div class="px-6 py-4">
                <div class="font-bold text-xl mb-2">{d.title}</div>
                <p class="text-gray-700 text-base">{d.details}</p>
              </div>
              <div class="px-6 pt-4 pb-2"></div>
            </div>
          </div>
        ))}
    </div>
  );
}
