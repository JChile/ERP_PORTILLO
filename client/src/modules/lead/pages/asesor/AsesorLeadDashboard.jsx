import React, { useState, useEffect, useContext } from "react";
import CustomCard from "../../components/CustomCard";
import { getProyectos } from "../../../proyectos/helpers";

const AsesorLeadDashboard = ({ token }) => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(false);

  const fetchProjects = async () => {
    try {
      const data = await getProyectos({ authToken: token });
      setProjects(data);
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="flex flex-col gap-y-5">
      <h1 className="text-2xl">Asesor de ventas</h1>
      <hr className="border-t-2 border-gray-300" />
      <h2 className="text-xl">Proyectos Asignados</h2>
      <CustomCard {...projects[0]} />
      <hr className="border-t-2 border-gray-300" />
      <h2 className="text-xl">Proyectos Registrados</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {projects.map((item) => (
          <CustomCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default AsesorLeadDashboard;
