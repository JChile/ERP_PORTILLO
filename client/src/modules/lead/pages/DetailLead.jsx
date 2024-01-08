import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getLead } from "../helpers";
import { Button, Checkbox } from "@mui/material";
import { DialogForm } from "../../ventas/components/DialogForm";
import { AuthContext } from "../../../auth";

export const DetailLead = () => {
  const { idLead } = useParams();
  const [showDialog, setShowDialog] = useState(false);
  const { authTokens, } = useContext(AuthContext)
  const [lead, setLead] = useState({
    nombre: "",
    apellido: "",
    celular: "",
    telefono: "",
    comentario: "",
    llamar: true,
    asesor: {
      user: {
        username: "",
      },
    },
    estado: "A",
    estadoLead: "EP",
    objecion: {
      nombre: "",
    },
    campania: {
      nombre: "",
    },
  });

  const {
    nombre,
    apellido,
    celular,
    telefono,
    comentario,
    llamar,
    asesor,
    estado,
    estadoLead,
    objecion,
    campania,
  } = lead;

  const obtenerLead = async (idLead) => {
    const auxLead = await getLead(idLead,authTokens.access);
    setLead(auxLead);
  };

  const navigate = useNavigate();
  const onNavigateBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const controller = new AbortController();
    obtenerLead(idLead);
    return () => controller.abort();
  }, []);

  return (
    <>
      {showDialog ? (
        <DialogForm
          lead={idLead}
          isOpen={showDialog}
          onClose={() => setShowDialog(false)}
          token={authTokens.access}
        />
      ) : null}

      <div className="flex flex-col gap-y-4">
        <div className="p-3 border-[1px] flex flex-col gap-x-5">
          <h1 className="text-lg font-bold">Detalle Lead</h1>
          {/* <h3 className="text-sm">Proyecto: {proyecto.nombre}</h3> */}
        </div>
        <div className="p-3 border-[1px] flex flex-col gap-y-4">
          <div className="flex flex-col md:flex-row min-w-[242px] gap-x-2 gap-y-3">
            <div className="w-full flex flex-col gap-y-3">
              <label className="block flex gap-y-1 min-w-full">
                <span className="block text-sm font-medium min-w-[10rem] text-zinc-500">
                  Nombre:
                </span>
                <span className="block text-sm">{nombre || ""}</span>
              </label>

              <label className="block flex gap-y-1 ">
                <span className="block text-sm font-medium min-w-[10rem] text-zinc-500">
                  Apellido:
                </span>
                <span className="block text-sm">{apellido || ""}</span>
              </label>

              <label className="block flex gap-y-1 ">
                <span className="block text-sm font-medium min-w-[10rem] text-zinc-500">
                  Celular:
                </span>
                <span className="block text-sm">{celular || ""}</span>
              </label>

              <div className="w-full flex flex-col gap-y-1">
                <span className="block text-sm font-medium min-w-[10rem] text-zinc-500">
                  Celular2:
                </span>
                <span className="block text-sm">{telefono || ""}</span>
              </div>

              <label className="block flex gap-y-1 ">
                <span className="block text-sm font-medium min-w-[10rem] text-zinc-500">
                  Llamar:
                </span>
                <Checkbox
                  name="llamar"
                  checked={llamar}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </label>
            </div>

            <div className="w-full flex flex-col gap-y-3">
              <label className="block flex gap-y-1 ">
                <span className="block text-sm font-medium min-w-[10rem] text-zinc-500">
                  Estado:
                </span>
                <span className="block text-sm">{estadoLead || ""}</span>
              </label>

              <label className="block flex gap-y-1 ">
                <span className="block text-sm font-medium min-w-[10rem] text-zinc-500">
                  Objeciones:
                </span>
                <span className="block text-sm">{objecion?.nombre || ""}</span>
              </label>

              <label className="block flex gap-y-1 ">
                <span className="block text-sm font-medium min-w-[10rem] text-zinc-500">
                  Asesor:
                </span>
                <span className="block text-sm">
                  {asesor?.codigo || "No asignado"}
                </span>
              </label>

              <label className="block flex gap-y-1 ">
                <span className="block text-sm font-medium min-w-[10rem] text-zinc-500">
                  Campaña:
                </span>
                <span className="block text-sm">
                  <span className="block text-sm">
                    {campania?.nombre || ""}
                  </span>
                </span>
              </label>
            </div>
          </div>

          <div className="w-full flex flex-row gap-x-4">
            <div className="w-full flex flex-col gap-y-1">
              <span className="block text-sm font-medium min-w-[10rem] text-zinc-500">
                Comentario:
              </span>
              <span className="block text-sm">{comentario || ""}</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="contained"
              color="success"
              sx={{ textTransform: "capitalize", borderRadius: 0 }}
              onClick={() => setShowDialog(true)}
            >
              Crear Evento
            </Button>
            <Button
              variant="contained"
              color="info"
              sx={{ textTransform: "capitalize", borderRadius: 0 }}
            >
              <Link to={"cotizacion/"}>Generar Cotización</Link>
            </Button>
          </div>

          <div className="flex justify-center">
            <Button
              variant="contained"
              sx={{ borderRadius: 0, backgroundColor: "gray" }}
              onClick={onNavigateBack}
            >
              Volver
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
