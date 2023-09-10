import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import Header from "@/pages/Layout/header";

export default function ReadDetailsJobPost() {
  const [data, setData] = useState([]);

  const router = useRouter();
  const id = router.query.id;

  useEffect(() => {
    const getData = async (id) => {
      try {
        const data = await axios.get(`http://localhost:3000/Hr/job/${id}`, {
          withCredentials: true,
        });
        console.log(data);
        setData(data.data);
      } catch (error) {
        console.error(error);
      }
    };
    getData(id);
  }, [id]);

  const handleClick = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/Hr/job/${id}`,
        {
          withCredentials: true,
        }
      );

      console.log(response);
      router.push("/Hr/readJobPost");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Header></Header>
      <hr />
      {data && (
        <div key={data.id} className=" flex  justify-center">
          <hr />

          <div class="w-2/4 rounded overflow-hidden shadow-lg py-5">
            <div class="px-6 py-4">
              <div class="font-bold text-xl mb-2">{data.title}</div>
              <p class="text-gray-700 text-base">{data.details}</p>
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

            <div class="px-6 pt-4 pb-2">
              <button className="btn btn-primary mr-5">
                <Link href={"/Hr/Update/" + data.id}>Update</Link>
              </button>

              <button
                className="btn btn-danger"
                type="submit"
                onClick={() => handleClick(data.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
