import React, { useEffect, useState, useContext } from "react";
import { Button, Card, CardContent, Typography, Avatar } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import { BsBuildingsFill } from "react-icons/bs";
import { deleteProyecto, getProyectos } from "../helpers";
import { FaRegEdit } from "react-icons/fa";
import { MdAdd, MdDeleteForever } from "react-icons/md";
import { DialogDeleteProyecto } from "../components/DialogDeleteProyecto";
import { combinarErrores } from "../../../utils";
import { AuthContext } from "../../../auth";
import { useAlertMUI } from "../../../hooks";
import { CustomCircularProgress, CustomAlert } from "../../../components";

const ListProyectos = () => {
  const { authTokens } = useContext(AuthContext);
  const [activeButton, setActiveButton] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [projects, setProjects] = useState([]);
  const [itemSeleccionado, setItemSeleccionado] = useState(null);
  const [visibleProgress, setVisibleProgress] = useState(false);

  const {
    feedbackCreate,
    feedbackMessages,
    setFeedbackMessages,
    handleCloseFeedback,
    handleClickFeedback,
  } = useAlertMUI();

  const obtenerProyectos = async () => {
    setVisibleProgress(true);
    try {
      const data = await getProyectos({ authToken: authTokens["access"] });
      setProjects(data);
      setVisibleProgress(false);
    } catch (error) {
      setVisibleProgress(false);
      const pilaError = combinarErrores(error);
      // mostramos feedback de error
      setFeedbackMessages({
        style_message: "error",
        feedback_description_error: pilaError,
      });
      handleClickFeedback();
    }
  };

  const navigate = useNavigate();

  const onCloseDeleteDialog = () => {
    setShowDialog(false);
    setItemSeleccionado(null);
  };

  const verDialog = (item) => {
    setShowDialog(true);
    setItemSeleccionado(item);
  };

  const onDeleteItemSelected = async (item) => {
    const { id } = item;
    const body = {
      estado: "I",
    };
    try {
      const result = await deleteProyecto(id, body, {
        authToken: authTokens["access"],
      });
      obtenerProyectos();
      onCloseDeleteDialog();
    } catch (error) {
      // handled error.
    }
  };

  const onEditItemSelected = (id) => {
    console.log(id);
    navigate(`/proyecto/update/${id}`);
  };

  useEffect(() => {
    obtenerProyectos();
  }, []);

  return (
    <>
      <div className="flex justify-between">
        <h1>Proyectos</h1>
      </div>
      <div className="flex items-center justify-between gap-x-4 mb-9">
        <div className="flex flex-col gap-y-1 align-middle">
          <div className="flex justify-center gap-x-3">
            <Button
              variant="contained"
              sx={{
                borderRadius: "0px",
                textTransform: "capitalize",
                backgroundColor: activeButton ? "#1976d2" : "#d1d5db",
                color: activeButton ? "white" : "black",
              }}
              /* onClick={() => handleButtonState(true)} */
            >
              Activas
            </Button>
            <Button
              variant="contained"
              sx={{
                borderRadius: "0px",
                textTransform: "capitalize",
                backgroundColor: !activeButton ? "#1976d2" : "#d1d5db",
                color: !activeButton ? "white" : "black",
              }}
              /* onClick={() => handleButtonState(false)} */
            >
              Inactivas
            </Button>
            <Link to={"/proyecto/create/"}>
              <Button
                endIcon={<MdAdd />}
                color="inherit"
                variant="contained"
                sx={{ borderRadius: "0px", textTransform: "capitalize" }}
              >
                Crear
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <Card key={project.id}>
            <CardContent className="flex flex-col items-center justify-center">
              <Avatar
                sx={{ width: 100, height: 100, backgroundColor: "#c6004c" }}
              >
                <Icon component={BsBuildingsFill} sx={{ color: "white" }} />
              </Avatar>
              <Typography variant="h5" component="div">
                {project.nombre}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {project.ubicacion}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {project.descripcion}
              </Typography>
              {/* <Button variant="outlined">Ver cotizaciones</Button> */}
              <div className="flex space-x-4">
                <IconButton
                  size="large"
                  color="primary"
                  onClick={() => onEditItemSelected(project.id)}
                >
                  <FaRegEdit />
                </IconButton>
                <IconButton
                  size="large"
                  color="error"
                  onClick={() => verDialog(project)}
                  /* onClick={() => onDeleteItemSelected(project)} */
                >
                  <MdDeleteForever />
                </IconButton>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {showDialog && (
        <DialogDeleteProyecto
          item={itemSeleccionado}
          showDialog={showDialog}
          onDeleteItemSelected={onDeleteItemSelected}
          onCloseDeleteDialog={onCloseDeleteDialog}
        />
      )}

      {/* COMPONENTE ALERTA */}
      <CustomAlert
        feedbackCreate={feedbackCreate}
        feedbackMessages={feedbackMessages}
        handleCloseFeedback={handleCloseFeedback}
      />
      {/* CIRCULAR PROGRESS */}
      {visibleProgress && <CustomCircularProgress />}
    </>
  );
};

export default ListProyectos;
