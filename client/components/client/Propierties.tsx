import Propierty from "./Propierty";

export default function Propierties() {
  return (
    <div className="flex items-center justify-between">
      <Propierty image="/images/establecimiento1.jpeg" title="DUOMO" />
      <Propierty image="/images/establecimiento2.jpeg" title="PERRO NEGRO" />
      <Propierty
        image="/images/establecimiento3.jpeg"
        title="La Leyenda Urbana"
      />
    </div>
  );
}
