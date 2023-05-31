"use client";
import axios from "axios";
import Image from "next/image";
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
    <div className="block rounded-lg my-3 bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-col items-center">
      <Image src="/images/cd.webp" width={150} height={150} />
      <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 ">
        Canción: {music?.name}
      </h5>
      {
        user?.[music?.userId]?.name && (
          <p className="mb-4 text-base text-neutral-600 ">
          Cliente: {user?.[music?.userId]?.name}
          </p>
        )
      }
    </div>
  );
}
