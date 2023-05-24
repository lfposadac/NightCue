"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import OwnerLayout from "@/components/layouts/OwnerLayout";
import {
  Button,
  Grid,
  Typography,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
} from "@mui/material";
import jwtDecode from "jwt-decode";

export default function Music() {
  const [properties, setProperties] = useState({});
  const [propierty, setProperty] = useState("");
  const [music, setMusic] = useState([]);
  const [user, setUser] = useState({});
  const [deletedMusic, setDeletedMusic] = useState([]);
  const [userId, setUserId] = useState("");

  const handlePropiertyChange = (e) => {
    const { value } = e.target;
    setProperty(value);
  };
  const handleDelete = async (musicId) => {
    try {
      // Eliminar la canción de la API
      await axios.delete(`http://localhost:3000/api/v1/music/${musicId}`);

      // Filtra la canción a eliminar del array de canciones
      const updatedMusic = music.filter((music) => music._id !== musicId);

      // Agrega la canción eliminada al array de canciones eliminadas
      const deleted = music.find((music) => music._id === musicId);
      setDeletedMusic((prevDeleted) => [...prevDeleted, deleted]);

      // Actualiza el estado de las canciones
      setMusic(updatedMusic);
    } catch (error) {
      console.log(error);
    }
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
    const token = localStorage.getItem("token");
    const decodeToken = jwtDecode(token);
    const { userId } = decodeToken;
    setUserId(userId);
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        if (!userId) return;
        const response = await axios.get(
          `http://localhost:3000/api/v1/propierty?userId=${userId}`
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
  }, [userId]);

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

  useEffect(() => {
    const deleteMusicFromAPI = async () => {
      try {
        // Recorrer las canciones eliminadas y eliminarlas de la API
        for (const deleted of deletedMusic) {
          await axios.delete(
            `http://localhost:3000/api/v1/music/${deleted._id}`
          );
        }
      } catch (error) {
        console.log(error);
      }
    };

    deleteMusicFromAPI();
  }, [deletedMusic]);

  return (
    <OwnerLayout>
      <div className="flex flex-col items-center min-h-[100vh] pt-5">
        <h1 className="text-3xl text-white mb-5">ULTIMAS CANCIONES PEDIDAS</h1>

        <form>
          <label className="text-white text-xl">
            Selecciona El Establecimiento
          </label>
          <select
            value={propierty}
            data-te-select-init
            onChange={handlePropiertyChange}
            className="border-2 border-gray-100"
          >
            {Object.keys(properties).map((key) => (
              <option key={key} value={key}>
                {properties?.[key].name}
              </option>
            ))}
          </select>
        </form>

        <div className="flex flex-wrap gap-4 justify-center">
          {music.map((music, i) => (
            <div
              key={i}
              className="block rounded-lg my-3 bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]"
            >
              <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800">
                {music?.name}
              </h5>
              <p className="mb-4 text-base text-neutral-600">
                {user?.[music?.userId]?.name}
              </p>
              <button
                onClick={() => handleDelete(music._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      </div>
    </OwnerLayout>
  );
}
