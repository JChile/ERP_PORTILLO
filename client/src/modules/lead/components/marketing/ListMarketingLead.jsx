import React, { useState } from "react";
import { Button, Tab, Tabs } from "@mui/material";
import { CustomDatePicker } from "../../../../components";
import { HiUserGroup } from "react-icons/hi";
import { RiFileExcel2Fill } from "react-icons/ri";
import { MdFilterAlt } from "react-icons/md";
import { ViewLeadMarketingRecienCreado } from "./ViewLeadMarketingRecienCreado";
import { ViewLeadMarketingActivo } from "./ViewLeadMarketingActivo";
import { ViewLeadMarketingInactivo } from "./ViewLeadMarketingInactivo";
import { useNavigate } from "react-router-dom";

export const ListMarketingLead = () => {
  const navigate = useNavigate();
  // flag reload
  const [flagReload, setFlagReload] = useState(false);

  // filtros de fechas
  const [filterDate, setFilterDate] = useState({
    startDate: null,
    endDate: null,
  });
  const { startDate, endDate } = filterDate;

  // change flag
  const onSubmitFilter = (event) => {
    // cambiamos el flag de reload
    setFlagReload((prev) => !prev);
  };

  // funcion para cambiar fecha desde
  const onChangeDatePickerFechaDesde = (newDate) => {
    // actualizamos la fecha
    setFilterDate({
      ...filterDate,
      startDate: newDate,
    });
  };

  // funcion para cambiar fecha hasta
  const onChangeDatePickerFechaHasta = (newDate) => {
    // actualizamos la fecha
    setFilterDate({
      ...filterDate,
      endDate: newDate,
    });
  };

  // manejadores de tabs
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => setValue(newValue);

  return (
    <>
      <div className="flex flex-col gap-y-5">
        <h1 className="text-2xl">Gestión de leads - Marketing</h1>
        <div className="mt-2 flex justify-between">
          {/* Filtro de fechas */}
          <div className="flex gap-x-2">
            <CustomDatePicker
              defaultValue={startDate}
              onNewFecha={onChangeDatePickerFechaDesde}
              label="Fecha Desde"
            />
            <CustomDatePicker
              defaultValue={endDate}
              onNewFecha={onChangeDatePickerFechaHasta}
              label="Fecha Hasta"
            />
            <Button
              startIcon={<MdFilterAlt />}
              variant="contained"
              sx={{ textTransform: "capitalize" }}
              onClick={onSubmitFilter}
            >
              Filtrar
            </Button>
          </div>
          {/* Acciones de agregar */}
          <div className="flex items-end gap-x-2">
            <Button
              startIcon={<HiUserGroup />}
              onClick={() => navigate("/lead/create")}
              color="primary"
              variant="contained"
            >
              Añadir
            </Button>
            <Button
              startIcon={<RiFileExcel2Fill />}
              onClick={() => navigate("/lead/create/sheet")}
              color="warning"
              variant="contained"
            >
              Importar
            </Button>
          </div>
        </div>
        <React.Fragment>
          <Tabs
            aria-label="basic tabs"
            value={value}
            onChange={handleChange}
            sx={{ marginTop: 3 }}
            centered
            variant="fullWidth"
          >
            <Tab
              sx={{
                textTransform: "capitalize",
                fontWeight: "semibold",
                color: "black",
                fontSize: "0.9rem",
              }}
              label="Leads recien creados"
            />
            <Tab
              sx={{
                textTransform: "capitalize",
                fontWeight: "semibold",
                color: "black",
                fontSize: "0.9rem",
              }}
              label="Leads activos"
            />
            <Tab
              sx={{
                textTransform: "capitalize",
                fontWeight: "semibold",
                color: "black",
                fontSize: "0.9rem",
              }}
              label="Leads inactivos"
            />
          </Tabs>

          <CustomTabPanel value={value} index={0}>
            <ViewLeadMarketingRecienCreado
              startDate={startDate}
              endDate={endDate}
              flagReload={flagReload}
              setFlagReload={setFlagReload}
            />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <ViewLeadMarketingActivo
              startDate={startDate}
              endDate={endDate}
              flagReload={flagReload}
              setFlagReload={setFlagReload}
            />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <ViewLeadMarketingInactivo
              startDate={startDate}
              endDate={endDate}
              flagReload={flagReload}
              setFlagReload={setFlagReload}
            />
          </CustomTabPanel>
        </React.Fragment>
      </div>
    </>
  );
};

/**
 * Custom tab panel to use as tab wrapper.
 * @param {*} props
 * @returns
 */
const CustomTabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
};
