import React from "react";
import { HotTable } from "@handsontable/react";
import { registerAllModules } from "handsontable/registry";
import "handsontable/dist/handsontable.full.min.css";
import { FilterProyectos } from "../../../components";
import { FilterProyectoCampania } from "../../../components/multiple-filters";
import { ImportFileLeads } from "../components";

// register Handsontable's modules
registerAllModules();

export const AddLeadSheet = () => {
  const data = new Array(100).fill("").map((_, rowIndex) => {
    return new Array(8).fill("").map((_, colIndex) => "");
  });

  const onAddProyecto = ({ id }) => {
    console.log(id);
  };

  return (
    <>
      <div className="relative border-2 rounded-md border-inherit p-5">
        <h1 className="text-lg font-bold">Manejador automatico</h1>
        <hr className="my-4"></hr>

        {/* Primera sección: Importa un archivo */}
        <div className="mb-4">
          <h2 className="text-md font-semibold mb-2">Seleccione una campaña</h2>
          {/* Tu contenido para importar un archivo aquí */}
          <FilterProyectoCampania />
        </div>
        <hr className="my-4"></hr>

        {/* Primera sección: Importa un archivo */}
        <ImportFileLeads />
        <hr className="my-4"></hr>
        {/* Segunda sección: Copie la información en la hoja de cálculo */}
        <div>
          <h2 className="text-md font-semibold mb-2">
            Copie la información en la hoja de cálculo
          </h2>
          <div className="h-full w-full overflow-auto">
            <HotTable
              data={data}
              rowHeaders={true}
              colHeaders={true}
              stretchH="all"
              height="auto"
              licenseKey="non-commercial-and-evaluation"
            />
          </div>
        </div>
      </div>
    </>
  );
};
