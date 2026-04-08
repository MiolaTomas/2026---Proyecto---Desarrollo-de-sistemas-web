import { z } from "zod";

export const personalSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido"),
  apellido: z.string().min(1, "El apellido es requerido"),
  email: z.string().email("Email inválido"),
  telefono: z.string().optional(),
  ciudad: z.string().optional(),
  pais: z.string().optional(),
  linkedin: z.string().url("URL inválida").or(z.literal("")).optional(),
  website: z.string().url("URL inválida").or(z.literal("")).optional(),
  titulo: z.string().optional(),
  resumen: z.string().optional(),
});

export const educacionItemSchema = z.object({
  institucion: z.string().min(1, "La institución es requerida"),
  titulo: z.string().min(1, "El título es requerido"),
  area: z.string().optional(),
  estado: z.string().optional(),
  inicio: z.string().optional(),
  fin: z.string().optional(),
  descripcion: z.string().optional(),
});

export const experienciaItemSchema = z.object({
  empresa: z.string().min(1, "La empresa es requerida"),
  cargo: z.string().min(1, "El cargo es requerido"),
  modalidad: z.string().optional(),
  tipo: z.string().optional(),
  inicio: z.string().optional(),
  fin: z.string().optional(),
  actual: z.boolean().optional(),
  descripcion: z.string().optional(),
});

export const proyectoItemSchema = z.object({
  nombre: z.string().min(1, "El nombre del proyecto es requerido"),
  rol: z.string().optional(),
  url: z.string().url("URL inválida").or(z.literal("")).optional(),
  repo: z.string().url("URL inválida").or(z.literal("")).optional(),
  tecnologias: z.string().optional(),
  descripcion: z.string().optional(),
});

export const certificacionItemSchema = z.object({
  nombre: z.string().min(1, "El nombre del certificado es requerido"),
  organizacion: z.string().optional(),
  fecha: z.string().optional(),
  expiracion: z.string().optional(),
  noExpira: z.boolean().optional(),
  url: z.string().url("URL inválida").or(z.literal("")).optional(),
});

export const habilidadTecnicaSchema = z.object({
  nombre: z.string().min(1, "Nombre requerido"),
  nivel: z.string().optional(),
  nivel_num: z.number().min(1).max(5).optional(),
});

export const idiomaSchema = z.object({
  nombre: z.string().min(1, "Nombre requerido"),
  nivel: z.string().optional(),
});

// Validate a single section and return { success, errors }
export function validateSection(schema, data) {
  const result = schema.safeParse(data);
  if (result.success) return { success: true, errors: {} };
  const errors = {};
  for (const issue of result.error.issues) {
    const key = issue.path.join(".");
    errors[key] = issue.message;
  }
  return { success: false, errors };
}

// Validate an array of items, return array of error objects (empty = valid)
export function validateArray(schema, items) {
  return items.map((item) => {
    const r = schema.safeParse(item);
    if (r.success) return {};
    const errs = {};
    for (const issue of r.error.issues) {
      errs[issue.path.join(".")] = issue.message;
    }
    return errs;
  });
}
