import React, { useEffect, useState } from "react";
import { getProyectosCampanias } from "./getProyectosCampanias";
import { Autocomplete, TextField } from "@mui/material";

const defaultOptionProyecto = {
  id: 0,
  label: "Seleccione un proyecto",
  value: 0,
};

const defaultOptionCampania = {
  id: 0,
  label: "Seleccione una campania",
  value: 0,
};

export const FilterProyectoCampania = ({ onAddCampania = () => {} }) => {
  const [proyecto, setProyecto] = useState([]);
  const [valueProyecto, setValueProyecto] = useState(defaultOptionProyecto);
  const [campania, setCampania] = useState([]);
  const [valueCampania, setValueCampania] = useState(defaultOptionCampania);

  const traerDataProyectosCampanias = async () => {
    const result = await getProyectosCampanias();
    const auxProyectos = result.map((element) => ({
      id: element.id,
      label: element.nombre,
      value: element.id,
      campanias: element.campania,
    }));

    setProyecto([defaultOptionProyecto, ...auxProyectos]);
  };

  const handleChangeProyecto = (event, value) => {
    setValueProyecto(value);
    if (value.id !== 0) {
      const formatCampanias = value.campanias.map((element) => {
        return {
          id: element.id,
          label: element.nombre,
          value: element.id,
        };
      });
      setCampania([defaultOptionCampania, ...formatCampanias]);
      setValueCampania(defaultOptionCampania);
    }
  };

  const handleChangeCampania = (event, value) => {
    setValueCampania(value);
    onAddCampania(value);
  };

  useEffect(() => {
    traerDataProyectosCampanias();
  }, []);

  return (
    <div className="flex space-x-4">
      {/* Utiliza flex y space-x para organizar horizontalmente con separación */}
      <div className="w-4/5">
        {/* Ancho más grande, en este caso 75% del espacio disponible */}
        <label
          htmlFor="proyecto"
          className="block text-sm font-medium text-gray-700"
        >
          Proyecto
        </label>
        <Autocomplete
          options={proyecto}
          value={valueProyecto}
          getOptionLabel={(option) => option.label}
          disableClearable
          onChange={handleChangeProyecto}
          isOptionEqualToValue={(option, value) => option.id == value.id}
          renderInput={(params) => <TextField {...params} size="small" />}
        />
      </div>
      <div className="w-4/5">
        {/* Ancho más grande, en este caso 75% del espacio disponible */}
        <label
          htmlFor="campania"
          className="block text-sm font-medium text-gray-700"
        >
          Campaña
        </label>
        <Autocomplete
          options={campania}
          value={valueCampania}
          getOptionLabel={(option) => option.label}
          disableClearable
          onChange={handleChangeCampania}
          isOptionEqualToValue={(option, value) => option.id == value.id}
          renderInput={(params) => <TextField {...params} size="small" />}
        />
      </div>
    </div>
  );
};
