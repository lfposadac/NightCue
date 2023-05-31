"use client";

export default function Jumbotron() {
  const handleButton = () => {
    window.location.href = "/client/booking";
  }

  return (
    <div className="rounded-lg bg-white p-6 text-gray-800 shadow-lg">
      <h2 className="mb-5 text-3xl font-semibold">
        Bienvenido a La Romana
      </h2>
      <p>
        Aquí puedes, reservar, revisar sus publicaciones e interactuar con ellos.
      </p>
      <hr className="my-6 h-0.5 border-t-0 bg-neutral-200 opacity-100 dark:opacity-30" />
      <p className="mb-4">
        Si quieres reservar. Puedes hacerlo desde aquí.
      </p>
      <button
        type="button"
        data-te-ripple-init
        data-te-ripple-color="light"
        onClick={handleButton}
        className="rounded bg-red-900 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-red-900 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-red-900 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-red-900 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
      >
        Reservar
      </button>
    </div>
  );
}
