import { z } from "zod";

export const candidatoSchema = z.object({
  nombre: z
    .string()
    .min(1, "El nombre es requerido")
    .regex(
      /^[a-záéíóúüñA-ZÁÉÍÓÚÜÑ\s]+$/,
      "El nombre no puede contener números",
    ),
  apellido: z
    .string()
    .min(1, "El apellido es requerido")
    .regex(
      /^[a-záéíóúüñA-ZÁÉÍÓÚÜÑ\s]+$/,
      "El apellido no puede contener números",
    ),
  telefono: z
    .string()
    .regex(/^[\d\s\-\+\(\)]{8,20}$/, "Ingrese un teléfono válido"),
  email: z.string().email("Ingrese un email válido"),
  linkedin: z.string().url("Ingrese una URL válida").or(z.literal("")),
  website: z.string().url("Ingrese una URL válida").or(z.literal("")),
  provincia: z.string().min(1, "Seleccione una provincia"),
  foto: z.string().optional(),
});

export const educacionSchema = z
  .object({
    institucion: z.string().min(1, "La institución es requerida"),
    titulo: z.string().min(1, "El título es requerido"),
    fechaInicio: z.string().min(1, "La fecha de inicio es requerida"),
    fechaFin: z.string().optional(),
    cursandoActualmente: z.boolean(),
  })
  .refine(
    (data) => {
      if (!data.cursandoActualmente && !data.fechaFin) return false;
      return true;
    },
    {
      message: "La fecha de fin es requerida",
      path: ["fechaFin"],
    },
  );

export const experienciaSchema = z
  .object({
    empresa: z.string().min(1, "La empresa es requerida"),
    cargo: z.string().min(1, "El cargo es requerido"),
    fechaInicio: z.string().min(1, "La fecha de inicio es requerida"),
    fechaFin: z.string().optional(),
    trabajandoActualmente: z.boolean(),
    descripcion: z.string().min(1, "La descripción es requerida"),
  })
  .refine(
    (data) => {
      if (!data.trabajandoActualmente && !data.fechaFin) return false;
      return true;
    },
    {
      message: "La fecha de fin es requerida",
      path: ["fechaFin"],
    },
  );
