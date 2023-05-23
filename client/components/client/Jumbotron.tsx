export default function Jumbotron() {
  return (
    <div className="rounded-lg bg-white p-6 text-gray-800 shadow-lg">
      <h2 className="mb-5 text-3xl font-semibold">
        Bienvenido Al Panel De Usuario
      </h2>
      <p>
        Aquí puedes revisar todos los establecimientos, interactuar con ellos,
        hacer reservaciones, revisar sus publicaciones y más.
      </p>
      <hr className="my-6 h-0.5 border-t-0 bg-neutral-200 opacity-100 dark:opacity-30" />
      <p className="mb-4">
        Si quieres revisar las ultimas publicaciones podemos verlas.
      </p>
      <button
        type="button"
        data-te-ripple-init
        data-te-ripple-color="light"
        className="rounded bg-gray-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
      >
        Ver Todos Los Establecimientos
      </button>
    </div>
  );
}
