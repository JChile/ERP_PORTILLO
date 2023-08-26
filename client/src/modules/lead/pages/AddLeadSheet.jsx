import React from "react";
import { HotTable } from "@handsontable/react";
import { registerAllModules } from "handsontable/registry";
import "handsontable/dist/handsontable.full.min.css";

// register Handsontable's modules
registerAllModules();

export const AddLeadSheet = () => {
  const data = new Array(100).fill("").map((_, rowIndex) => {
    return new Array(8).fill("").map((_, colIndex) => "");
  });

  return (
    <div className="h-full w-full overflow-auto">
      <h1>Insertar leads</h1>
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
  );
};
