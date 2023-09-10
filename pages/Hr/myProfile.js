import React, { useEffect, useState } from "react";
import Header from "../Layout/header";
import useFetch from "../lib/useFetch";
import { useAuth } from "../lib/authContext";
import { useRouter } from "next/router";
import axios from "axios";

export default function MyProfile() {
  const [data, setJsonData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await axios.get("http://localhost:3000/hr/myprofile/", {
        withCredentials: true,
      });
      const jsonData = response.data;
      console.log(jsonData);
      setJsonData(jsonData);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <Header dashboard="My Profile" />
      {/* {accepted ? ( */}
      {data && (
        <div key={data.id} className=" flex  justify-center mt-20">
          {/* <p>Name: {data.name}</p>
          <p>Age: {data.age}</p>
          <p>Phone: {data.phone}</p>
          <p>Email: {data.email}</p>
          <p>Gender: {data.gender}</p>
          <p>Last update: {data.updatedDate}</p> */}

          <div className="card w-96 glass">
            <figure className="avatar">
              <img
                style={{ width: 250 }}
                className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
                src="http://localhost:3000/hr/getimage/"
                alt="Something went wrong"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{data.name}</h2>
              <p>Age: {data.age}</p>
              <p>Phone: {data.phone}</p>
              <p>Email: {data.email}</p>
              <p>Gender: {data.gender}</p>
              <p>Last update: {data.updatedDate}</p>
              {/* <div className="card-actions justify-end">
                <button className="btn btn-primary">Learn now!</button>
              </div> */}
            </div>
          </div>
        </div>
      )}
      {/* ) : (
        <h3>You are not eligible</h3>
      )} */}
    </div>
  );
}
