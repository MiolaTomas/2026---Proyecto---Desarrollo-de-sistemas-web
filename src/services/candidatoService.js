import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export async function crearCandidato(form, educaciones, experiencias) {
  const payload = {
    name: form.nombre,
    educations: educaciones.map((edu) => ({
      institution: edu.institucion,
      title: edu.titulo,
      fechaInicio: edu.fechaInicio,
      fechaFin: edu.fechaFin,
      cursandoActualmente: edu.cursandoActualmente,
    })),
    experiences: experiencias.map((exp) => ({
      company: exp.empresa,
      role: exp.cargo,
      fechaInicio: exp.fechaInicio,
      fechaFin: exp.fechaFin,
      trabajandoActualmente: exp.trabajandoActualmente,
      descripcion: exp.descripcion,
    })),
  };

  const response = await api.post("/users", payload);
  return response.data;
}
