/**
 * Eventos: 
 - Asesor: Nombre - Codigo. (arriba)
 - Opciones de filtrar por asesor.
 - Tipo evento (color) (nombre)
 - Tipo evento (asesor) (nombre)


Reporte:
- No considerar el infinito y tampoco considerar esa senana. para sacar el promedio de cada lead.
 */

class AsesorEntity {
  id: number;
  firstName: string;
  lastName: string;

  constructor(id: number, firstName: string, lastName: string) {
    this.firstName = firstName;
    this.id = id;
    this.lastName = lastName;
  }
}

interface LeadEntity {
  id: number;
  nombre: string;
  apellido: string;
  asignado: boolean;
  celular: string;
  celular2: string | null;
  comentario: string;
  horaRecepcion: string; // Debería ser un tipo de fecha válido, como Date
  llamar: boolean;
  importante: boolean;
  fecha_asignacion: string; // Debería ser un tipo de fecha válido, como Date
  fecha_desasignacion: string | null; // Debería ser un tipo de fecha válido, como Date
  recienCreado: boolean;
  fecha_creacion: string; // Debería ser un tipo de fecha válido, como Date
  fecha_actualizacion: string; // Debería ser un tipo de fecha válido, como Date
  asesor: number; // Debería ser un tipo de Asesor, pero aquí se usa un número
  campania: number;
  objecion: number;
  estado: string;
  estadoLead: string;
  estadoSeparacionLead: string;
  usuarioCreador: any; // Podría ser un tipo de usuario, pero aquí se usa cualquier cosa
  usuarioActualizador: any;
}

interface TipoEntity {
   id: number;
   nombre: string;
   estado: string;
}

interface EstadoEventoEntity {
   id: number;
   nombre: string;
   estado: string;
}


class EventEntity {
   id: number;
    titulo: string;
    duracion: number;
    fecha_visita: string; // Debería ser un tipo de fecha válido, como Date
    observacion: string;
    fecha_creacion: string; // Debería ser un tipo de fecha válido, como Date
    fecha_actualizacion: string; // Debería ser un tipo de fecha válido, como Date
    separado: boolean;
    asesor: AsesorEntity;
    lead: LeadEntity;
    tipo: TipoEntity;
    estado: string;
    estadoEvento: EstadoEventoEntity;
    usuarioCreador: number; // Debería ser un tipo de usuario, pero aquí se usa un número
    usuarioActualizador: any; // Podría ser un tipo de usuario, pero aquí se usa cualquier cosa
    objecion: number;

}

export { EventEntity };
