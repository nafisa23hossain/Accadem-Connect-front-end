import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import Header from "../../Layout/header";

export default function ReadCandidate() {
  const [data, setData] = useState([]);

  const router = useRouter();
  const id = router.query.id;

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axios.get(
          `http://localhost:3000/Moderator/candidate/${id}`,
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
    getData(id);
  }, []);

  return (
    <div>
      <Header></Header>
      <hr />

      {data &&
        data.map((d) => (
          <div className=" flex  justify-center" key={d.id}>
            <hr />
            <div class="w-2/4 rounded overflow-hidden border my-2 py-5">
              <div class="px-6 py-4">
                <div class="font-bold text-xl mb-2">{d.name}</div>
                <p class="text-gray-700 text-base">{d.phone}</p>
                <p class="text-gray-700 text-base">{d.email}</p>
              </div>
              <div class="px-6 pt-4 pb-2"></div>
            </div>
          </div>
        ))}
    </div>
  );
}
