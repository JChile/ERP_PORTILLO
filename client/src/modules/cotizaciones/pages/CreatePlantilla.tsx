import { Button, FormControl } from "@mui/material";
import React, { useState } from "react";
import { MdAdd } from "react-icons/md";

{
  /*

Una plantilla esta formado por lo siguiente.
  cantidad de cuotas
  cuota:
    una cuota tiene lo siguiente:
      fecha:
      n° (nombre):
      cuotas:
      monto: precio_total * cuota 


*/
}

interface PlantillaItem {
  id: number;
  date: Date;
  name: string;
  fee: number;
}

const CreatePlantilla = () => {
  const [cuotas, setCuotas] = useState<PlantillaItem[]>([]);

  const addNewRow = (event: any) => {
    console.log(event);
  };

  return (
    <React.Fragment>
      <div className="flex justify-between">
        <h1>Crear plantilla</h1>
        <Button
          variant="contained"
          color="success"
          sx={{ textTransform: "capitalize" }}
          endIcon={<MdAdd />}
          onClick={addNewRow}
        >
          Agregar fila
        </Button>
      </div>
      <h2>Detalle de coutas</h2>
      <table className="border border-black">
        <thead>
          <tr className="">
            <th>Fecha</th>
            <th>N°</th>
            <th>Cuota</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>18-Dic-23</td>
            <td>Inicial</td>
            <td>25%</td>
          </tr>
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default CreatePlantilla;
