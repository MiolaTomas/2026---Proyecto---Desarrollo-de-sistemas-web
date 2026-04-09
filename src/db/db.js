import Dexie from "dexie";

export const db = new Dexie("PortalTechDB");

db.version(1).stores({
  candidato: "++id, nombre, apellido, email",
  educaciones: "++id, institucion, titulo",
  experiencias: "++id, empresa, cargo",
});
