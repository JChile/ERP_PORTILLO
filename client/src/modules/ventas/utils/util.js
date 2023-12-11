export const transformToEvent = (oldEvent) => {
  const startEvent = new Date(oldEvent.fecha_visita);
  const durationMilliseconds = oldEvent.duracion * 60000;
  const endEvent = new Date(startEvent.getTime() + durationMilliseconds);
  return {
    title: oldEvent.titulo,
    start: startEvent,
    end: endEvent,
    proyecto: oldEvent.proyecto,
    tipo: oldEvent.tipo,
    descripcion: oldEvent.descripcion,
    estado: oldEvent.estado,
    ubicacion: oldEvent.ubicacion,
    id: oldEvent.id,
    asesor: oldEvent.asesor,
    duracion: oldEvent.duracion,
  };
};
