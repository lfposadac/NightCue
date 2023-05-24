"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function SingleMusic({ music }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/v1/user");
        const { data } = res.data;
        data.forEach(({ _id, ...res }) => {
          setUser((prev) => ({ ...prev, [_id]: res }));
        });
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  return (
    <div className="block rounded-lg my-3 bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
      <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 ">
        {music?.name}
      </h5>
      <p className="mb-4 text-base text-neutral-600 ">
        {user?.[music?.userId]?.name}
      </p>
    </div>
  );
}
