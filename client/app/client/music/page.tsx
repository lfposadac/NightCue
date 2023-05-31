"use client";
import CreateMusic from "@/components/client/CreateMusic";
import SingleMusic from "@/components/client/SingleMusic";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Music() {
  const [properties, setProperties] = useState({});
  const [propierty, setPropierty] = useState("64554a0c37a7c8969c91e9c7");
  const [music, setMusic] = useState([]);

  const handlePropiertyChange = (e) => {
    const { value } = e.target;
    setProperty(value);
  };

  const addMusic = (newMusic) => {
    setMusic((prev) => [...prev, newMusic]);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/v1/music?propiertyId=${propierty}`
        );
        const { data } = res.data;
        setMusic(data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [propierty]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/propierty"
        );
        const { data } = response.data;
        data.forEach(({ _id, ...res }, i) => {
          if (i === 0) setProperty(_id);
          setProperties((prev) => ({ ...prev, [_id]: res }));
        });
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <div className="flex flex-col items-center min-h-[100vh] pt-5">
      <CreateMusic addMusic={addMusic} />
      <h1 className="text-3xl">Aquí Puedes Ver Las Ultimas Canciones</h1>

      <div className="flex flex-wrap gap-4 justify-center">
        {music.map((music, i) => (
          <SingleMusic key={i} music={music} />
        ))}
      </div>
    </div>
  );
}

