import React, { useEffect, useState } from "react";
import { Button, Card, CardContent, Typography, Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import Icon from "@mui/material/Icon";
import { BsBuildingsFill } from "react-icons/bs";
import { getProyectos } from "../helpers";

const ListCotizaciones = () => {
  const [projects, setProjects] = useState([]);

  const getProjectsData = async () => {
    const data = await getProyectos();
    setProjects(data);
  };

  useEffect(() => {
    getProjectsData();
  }, []);

  return (
    <React.Fragment>
      <div className="flex justify-between">
        <h1>Cotizaciones</h1>
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
              <Button variant="outlined">Ver cotizaciones</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </React.Fragment>
  );
};

export default ListCotizaciones;
