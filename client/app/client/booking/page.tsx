"use client";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";

export default function Bookings() {
  const [propierties, setPropierties] = useState({});
  const [tables, setTables] = useState([]);
  const [propierty, setPropierty] = useState("64554a0c37a7c8969c91e9c7");
  const [selectedTable, setSelectedTable] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(0);

  const handlePropiertyChange = async (e) => {
    e.preventDefault();
    const { value } = e.target;
    setPropierty(value);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/propierty"
        );
        const { data } = response.data;
        if (data.length > 0) {
          setPropierty(data[0]._id);
          setPropierties(
            data.reduce((obj, item) => {
              obj[item._id] = item;
              return obj;
            }, {})
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const getTables = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/table?idPropierty=${propierty}`
        );
        const { data } = response.data;
        setTables(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (propierty !== "") {
      getTables();
    }
  }, [propierty]);

  const handleTableChange = (e) => {
    setSelectedTable(e.target.value);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e);
  };
  const handleNumberOfGuestsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNumberOfGuests(parseInt(e.target.value, 10));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const decodedToken: any = jwtDecode(token);
      const { userId } = decodedToken;
      if (!userId) return;
      const data = {
        idTable: selectedTable,
        date: selectedDate,
        numberOfGuests,
        userId,
      };

      const response = await axios.post(
        `http://localhost:3000/api/v1/booking/`,
        data
      );
      console.log(response);
    } catch (error) {
      console.log("Error al actualizar reserva:", error);
    }
  };

  const getNextDays = () => {
    const today = new Date();
    const currentDay = today.getDay(); // 0 (domingo) a 6 (sábado)
    const daysToAdd = (11 - currentDay) % 7; // Días hasta el próximo jueves
    const nextDays = [];

    for (let i = 0; i < 4; i++) {
      const nextDay = new Date(today);
      nextDay.setDate(today.getDate() + daysToAdd + i);
      nextDays.push(nextDay);
    }

    return nextDays;
  };

  const formatDate = (date: Date) => {
    if (!date) return "";
    if (!(date instanceof Date)) return "";
    const options = { weekday: "long", month: "long", day: "numeric" };
    return date?.toLocaleDateString("es-ES", options);
  };

  return (
    <div className="flex flex-col justify-start pt-5 items-center min-h-screen">
      <span className="bg-red-900 text-gray-100 p-2 text-xl" >¡Todos los jueves son NO COVER!</span>
      <div className="container">
        <div className="form-container">
          <h2 className="text-2xl mt-6 text-center">Selecciona una Mesa</h2>
          <form>
            <div className="form-group rounded-lg border border-gray-300 p-4">
              <select
                value={selectedTable}
                onChange={handleTableChange}
                className="form-control"
              >
                <option value="">Mesas</option>
                {tables.map((table) => (
                  <option key={table._id} value={table._id}>
                    {table.type}
                  </option>
                ))}
              </select>
            </div>
          </form>
        </div>
        <div className="form-container">
          <h2 className="text-2xl mt-6 text-center">Fecha de reserva</h2>
          <form>
            <div className="form-group rounded-lg border border-gray-300 p-4">
              <div className="date-cards">
                {getNextDays().map((date) => (
                  <div
                    key={date.getTime()}
                    className={`date-card ${
                      formatDate(date) === formatDate(selectedDate)
                        ? "selected"
                        : ""
                    }`}
                    onClick={() => handleDateChange(date)}
                  >
                    <span>{formatDate(date)}</span>
                  </div>
                ))}
              </div>
            </div>
          </form>
        </div>
        <div className="form-container">
          <h2 className="text-2xl mt-6 text-center">Número de invitados</h2>
          <form>
            <div className="form-group rounded-lg border border-gray-300 p-4 text-center">
              <input
                type="number"
                value={numberOfGuests}
                onChange={handleNumberOfGuestsChange}
                className="form-control"
                min={1}
              />
            </div>
          </form>
        </div>
        <button
          onClick={handleSubmit}
          disabled={
            !propierty || !selectedTable || !selectedDate || numberOfGuests <= 0
          }
          className="bg-red-900 p-3 text-white rounded-lg"
        >
          Reservar
        </button>
      </div>
      <style>
        {`
        .selected-button {
          background-color: black;
        }
        .container {
          margin-top: 20px;
        }
        .form-container {
          margin-bottom: 20px;
        }
        .text-center {
          text-align: center;
        }
        .form-group {
          margin-bottom: 10px;
        }
        .form-control {
          width: 100%;
          padding: 8px;
        }
        .date-cards {
          display: flex;
          justify-content: space-between;
        }
        .date-card {
          padding: 10px;
          border: 1px solid #ccc;
          cursor: pointer;
        }
        .date-card.selected {
          background-color: red;
          color: white;
        }
        .btn-reservar {
          background-color: red;
          color: white;
          padding: 8px 16px;
          border: none;
          cursor: pointer;
        }
        .btn-reservar:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}
      </style>
    </div>
  );
}
