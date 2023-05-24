"use client";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { Modal, Ripple, initTE } from "tw-elements";
initTE({ Modal, Ripple });

export default function AlertButton() {
  const [seeModal, setSeeModal] = useState(false);
  const [properties, setProperties] = useState({});
  const [alert, setAlert] = useState({
    userId: "",
    propiertyId: "",
    message: "",
  });

  const handlePropiertyChange = (e) => {
    const { value } = e.target;
    setAlert((prev) => ({ ...prev, propiertyId: value }));
  };

  const handleMessageChange = (e) => {
    const { value } = e.target;
    setAlert((prev) => ({ ...prev, message: value }));
  };

  const handleSendAlert = async () => {
    await axios.post("http://localhost:3000/api/v1/alert", alert);
    setSeeModal(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decode = jwtDecode(token);
    const { userId } = decode;
    setAlert((prev) => ({ ...prev, userId }));
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/propierty"
        );
        const { data } = response.data;
        data.forEach(({ _id, ...res }, i) => {
          if (i === 0) setAlert((prev) => ({ ...prev, propiertyId: _id }));
          setProperties((prev) => ({ ...prev, [_id]: res }));
        });
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <>
      <button
        type="button"
        className="absolute bottom-3 right-3 z-50 rounded bg-red-500 font-bold px-6 pb-2 pt-2.5 text-xs uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-red-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-red-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-red-500 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
        onClick={() => setSeeModal(true)}
      >
        Alert
      </button>

      {seeModal && (
        <div className="absolute z-50 h-full w-full overflow-y-auto mt-[8rem] ">
          <div className="pointer-events-none relative w-auto translate-y-[-50px] min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px]">
            <div className="min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none">
              <div className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                <h5
                  className="text-xl font-medium leading-normal text-neutral-800 "
                  id="exampleModalLabel"
                >
                  Create Alert
                </h5>

                <button
                  type="button"
                  className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                  data-te-modal-dismiss
                  aria-label="Close"
                  onClick={() => setSeeModal(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="relative flex-auto p-4" data-te-modal-body-ref>
                <form className="flex flex-col justify-end items-center">
                  <label>Selecciona El Establecimiento</label>
                  <select
                    value={alert?.propiertyId}
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

                  <div className="relative my-5" data-te-input-wrapper-init>
                    <textarea
                      className="peer block min-h-[auto] w-full rounded border-2 border-gray-100  bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-non [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                      rows={3}
                      placeholder="Your message"
                      onChange={handleMessageChange}
                    />
                    {alert.message.length === 0 && (
                      <label className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none">
                        Escribe Tu Problema
                      </label>
                    )}
                  </div>
                </form>
              </div>

              <div className="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                <button
                  type="button"
                  className="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                  data-te-modal-dismiss
                  data-te-ripple-init
                  data-te-ripple-color="light"
                  onClick={() => setSeeModal(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="ml-1 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                  onClick={handleSendAlert}
                >
                  Send Alert
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
