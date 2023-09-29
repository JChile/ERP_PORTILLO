import React from "react";
import { HotTable } from "@handsontable/react";
import { registerAllModules } from "handsontable/registry";
import "handsontable/dist/handsontable.full.min.css";
import { FilterProyectos } from "../../../components";

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

        <form className="min-w-[242px] flex flex-col gap-y-6 gap-x-8">
          <div className="flex flex-row gap-y-6 gap-x-8">
            <div className="w-6/12 flex flex-col gap-y-5">
              <label className="block flex flex-col gap-y-1 ">
                <span className="after:content-['*'] after:ml-0.5 after:text-yellow-500 block text-sm font-medium">
                  Proyecto
                </span>
                <FilterProyectos
                  defaultValue={null}
                  onNewInput={onAddProyecto}
                />
              </label>
            </div>
          </div>
        </form>
        <div className="h-full w-full overflow-auto">
          <button
            onClick={() => {
              console.log(data);
            }}
          >
            Mostrar data
          </button>
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
    </>
  );
};
