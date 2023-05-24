"use client";

import DefaultLayout from "@/components/layouts/DefaultLayout";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Login.module.css";
import jwtDecode from "jwt-decode";

export default function LoginPage() {
  const [roles, setRoles] = useState([]);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/auth/sign-in",
        credentials
      );
      const { data: dataRes } = res;
      const { status, data } = dataRes;
      if (status !== 200) {
        alert("Correo o contraseña incorrectos");
        return;
      }
      const { token } = data;
      localStorage.setItem("token", token);

      // Relocate to home page
      const decodeJWT = jwtDecode(token);
      const roleId = decodeJWT?.roelId;

      let role = null;
      roles?.forEach((e) => {
        if (role) return;
        role = e._id === roleId ? e : null;
      });

      switch (role.name) {
        case "Global User":
          window.location.href = "/global";
          break;

        case "Owner Admin":
          window.location.href = "/owner";
          break;

        default:
          window.location.href = "/client";
          break;
      }
    } catch ({ response }) {
      alert("Correo o contraseña incorrectos");
    }
  };

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get("http://localhost:3000/api/v1/role");
      const { data: dataRoles } = data;
      setRoles(dataRoles);
    };
    getData();
  }, []);

  return (
    <DefaultLayout>
      <div className={styles.login}>
        <div className="block max-w-sm rounded-lg bg-red-500 p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
          <form>
            <div className="relative mb-6" data-te-input-wrapper-init>
              <input
                type="email"
                className="border-2 border-gray-700 peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                id="exampleInputEmail2"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                value={credentials.email}
                onChange={handleChange}
                name="email"
              />
              {credentials.email.length <= 0 && (
                <label
                  for="exampleInputPassword2"
                  className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                >
                  Correo
                </label>
              )}
            </div>

            <div className="relative mb-6" data-te-input-wrapper-init>
              <input
                type="password"
                className="border-2 border-gray-700 peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                id="exampleInputPassword2"
                placeholder="Password"
                value={credentials.password}
                name={"password"}
                onChange={handleChange}
              />
              {credentials.password.length <= 0 && (
                <label
                  for="exampleInputPassword2"
                  className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                >
                  Contraseña
                </label>
              )}
            </div>

            <div className="mb-6 flex items-center justify-between">
              <div className="mb-6 flex flex-col items-center justify-between">
                <div className="block min-h-[1.5rem] pl-[1.5rem]">
                  <input
                    className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                    type="checkbox"
                    value=""
                    id="exampleCheck2"
                  />
                  <label
                    className="inline-block pl-[0.15rem] hover:cursor-pointer"
                    for="exampleCheck2"
                  >
                    Recuerdame
                  </label>
                </div>
              </div>

              <a
                href="#!"
                className="mt-5 text-gray-900 transition duration-150 ease-in-out hover:text-gray-900 focus:text-gray-900 active:text-gray-900 dark:text-gray-900 dark:hover:text-gray-900 dark:focus:text-gray-900 dark:active:text-gray-600"
              >
                ¿Olvidaste Tu Contraseña?
              </a>
            </div>

            <button
              type="submit"
              className="inline-block w-full rounded bg-gray-700 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-gray-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-gray-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-gray-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
              data-te-ripple-init
              data-te-ripple-color="light"
              onClick={handleSubmit}
            >
              Ingresar
            </button>

            <p className="mt-6 text-center text-neutral-800 dark:text-neutral-200">
              ¿No eres miembro?
              <a
                href="/register"
                className="ml-2 text-gray-700 transition duration-150 ease-in-out hover:text-gray-700 focus:text-gray-700 active:text-gray-700 dark:text-gray-700 dark:hover:text-gray-700 dark:focus:text-gray-700 dark:active:text-gray-700"
              >
                Registrarse
              </a>
            </p>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
}
