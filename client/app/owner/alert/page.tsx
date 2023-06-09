"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import OwnerLayout from "@/components/layouts/OwnerLayout";
import jwtDecode from "jwt-decode";

export default function Alert() {
  const [properties, setProperties] = useState({});
  const [propierty, setProperty] = useState("");
  const [alert, setAlert] = useState([]);
  const [user, setUser] = useState({});
  const [userId, setUserId] = useState("");

  const handlePropiertyChange = (e) => {
    const { value } = e.target;
    setProperty(value);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decodeToken = jwtDecode(token);
    const { userId } = decodeToken;
    setUserId(userId);
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/v1/alert?propiertyId=${propierty}`
        );
        const { data } = res.data;
        setAlert(data);
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

  const handleDelete = async (alertId) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/alert/${alertId}`);
      // Realiza alguna lógica adicional si es necesario
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <OwnerLayout>
      <div className="flex flex-col items-center min-h-[100vh] pt-5">
        <h1 className="text-3xl text-white mb-5">ALERTAS</h1>

        <form>
          <label className="text-white text-xl">
            Selecciona el establecimiento
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
          {alert.map((alert, i) => {
            return (
              <div
                key={i}
                className="block rounded-lg my-3 bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]"
              >
                <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800">
                  mensaje: {alert?.message}
                </h5>
                <p className="mb-4 text-base text-neutral-600">
                  Usuario: {user?.[alert?.userId]?.name}
                </p>
                <button
                  onClick={() => handleDelete(alert._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                  Eliminar
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </OwnerLayout>
  );
}
