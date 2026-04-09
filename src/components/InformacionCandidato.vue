<script setup>
import { ref, reactive } from "vue";
import BaseInput from "@/components/BaseInput.vue";
import { provincias } from "@/data/provincias.js"
import { candidatoSchema, educacionSchema, experienciaSchema } from "@/schemas/candidatoSchema.js";
import { db } from "@/db/db.js";

// ── Información personal ──────────────────────────────────────────
const form = reactive({
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    linkedin: "",
    website: "",
    provincia: "",
});

const errors = reactive({
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    linkedin: "",
    website: "",
    provincia: "",
});

function validateField(field) {
    errors[field] = "";
    const result = candidatoSchema.shape[field].safeParse(form[field]);
    if (!result.success) {
        errors[field] = result.error.issues[0].message;
    }
}

// ── Educación ─────────────────────────────────────────────────────
const educaciones = ref([
    {
        institucion: "",
        titulo: "",
        fechaInicio: "",
        fechaFin: "",
        cursandoActualmente: false,
        errors: { institucion: "", titulo: "", fechaInicio: "", fechaFin: "" }
    }
]);

function agregarEducacion() {
    educaciones.value.push({
        institucion: "",
        titulo: "",
        fechaInicio: "",
        fechaFin: "",
        cursandoActualmente: false,
        errors: { institucion: "", titulo: "", fechaInicio: "", fechaFin: "" }
    });
}

function eliminarEducacion(index) {
    educaciones.value.splice(index, 1);
}

function validateEducacionField(index, field) {
    educaciones.value[index].errors[field] = "";
    const result = educacionSchema.shape[field].safeParse(educaciones.value[index][field]);
    if (!result.success) {
        educaciones.value[index].errors[field] = result.error.issues[0].message;
    }
}

// ── Experiencia laboral ───────────────────────────────────────────
const experiencias = ref([
    {
        empresa: "",
        cargo: "",
        fechaInicio: "",
        fechaFin: "",
        trabajandoActualmente: false,
        descripcion: "",
        errors: { empresa: "", cargo: "", fechaInicio: "", fechaFin: "", descripcion: "" }
    }
]);

function agregarExperiencia() {
    experiencias.value.push({
        empresa: "",
        cargo: "",
        fechaInicio: "",
        fechaFin: "",
        trabajandoActualmente: false,
        descripcion: "",
        errors: { empresa: "", cargo: "", fechaInicio: "", fechaFin: "", descripcion: "" }
    });
}

function eliminarExperiencia(index) {
    experiencias.value.splice(index, 1);
}

function validateExperienciaField(index, field) {
    experiencias.value[index].errors[field] = "";
    const result = experienciaSchema.shape[field].safeParse(experiencias.value[index][field]);
    if (!result.success) {
        experiencias.value[index].errors[field] = result.error.issues[0].message;
    }
}

// ── Dexie ─────────────────────────────────────────────────────────
async function guardarDatos() {
    try {
        await db.candidato.clear();
        await db.educaciones.clear();
        await db.experiencias.clear();

        await db.candidato.add({ ...form });

        for (const educacion of educaciones.value) {
            const { errors, ...data } = educacion;
            await db.educaciones.add(data);
        }

        for (const experiencia of experiencias.value) {
            const { errors, ...data } = experiencia;
            await db.experiencias.add(data);
        }

        console.log("Guardado exitoso!");
    } catch (error) {
        console.error("Error al guardar:", error);
    }
}

// ── Submit ────────────────────────────────────────────────────────
async function handleSubmit() {
    console.log("form actual:", { ...form });
    console.log("handleSubmit ejecutado");
    Object.keys(errors).forEach(k => (errors[k] = ""));


    const resultForm = candidatoSchema.safeParse(form);
    console.log("resultForm:", resultForm);
    if (!resultForm.success) {
        resultForm.error.issues.forEach(issue => {
            const field = issue.path[0];
            if (field in errors) errors[field] = issue.message;
        });
    }

    let educacionesValidas = true;
    educaciones.value.forEach((educacion) => {
        console.log("educacion:", educacion);
        const resultEdu = educacionSchema.safeParse(educacion);
        console.log("resultEdu:", resultEdu);
        if (!resultEdu.success) {
            educacionesValidas = false;
            resultEdu.error.issues.forEach(issue => {
                const field = issue.path[0];
                if (field in educacion.errors) educacion.errors[field] = issue.message;
            });
        }
    });

    let experienciasValidas = true;
    experiencias.value.forEach((experiencia) => {
        const resultExp = experienciaSchema.safeParse(experiencia);
        if (!resultExp.success) {
            experienciasValidas = false;
            resultExp.error.issues.forEach(issue => {
                const field = issue.path[0];
                if (field in experiencia.errors) experiencia.errors[field] = issue.message;
            });
        }
    });

    if (!resultForm.success || !educacionesValidas || !experienciasValidas) return;
    console.log("educacionesValidas:", educacionesValidas);
    console.log("experienciasValidas:", experienciasValidas);
    await guardarDatos();
    console.log("Datos guardados correctamente!");
}
</script>

<template>
    <div class="min-h-screen bg-gray-50 py-10 px-4">
        <div class="max-w-2xl mx-auto">

            <!-- Header -->
            <div class="mb-8">
                <h1 class="text-2xl font-bold text-gray-900">Perfil del candidato</h1>
                <p class="text-sm text-gray-500 mt-1">Completá tu información para aplicar a ofertas laborales</p>
            </div>

            <form novalidate @submit.prevent="handleSubmit" class="flex flex-col gap-8">

                <!-- Información personal -->
                <div class="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col gap-5">
                    <h2 class="text-base font-semibold text-blue-600 border-b border-gray-100 pb-3">
                        Información personal
                    </h2>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <BaseInput label="Nombre" v-model="form.nombre" placeholder="Ingrese su nombre..."
                            :error="errors.nombre" @blur="validateField('nombre')" />
                        <BaseInput label="Apellido" v-model="form.apellido" placeholder="Ingrese su apellido..."
                            :error="errors.apellido" @blur="validateField('apellido')" />
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <BaseInput label="Teléfono" v-model="form.telefono" placeholder="Ingrese su teléfono..."
                            :error="errors.telefono" @blur="validateField('telefono')" />
                        <BaseInput type="email" label="Email" v-model="form.email" placeholder="Ingrese su correo..."
                            :error="errors.email" @blur="validateField('email')" />
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <BaseInput label="LinkedIn" v-model="form.linkedin" placeholder="https://linkedin.com/in/..."
                            :error="errors.linkedin" @blur="validateField('linkedin')" />
                        <BaseInput label="Website" v-model="form.website" placeholder="https://..."
                            :error="errors.website" @blur="validateField('website')" />
                    </div>

                    <div class="flex flex-col gap-1.5">
                        <label class="text-sm font-medium text-gray-700">Provincia</label>
                        <select v-model="form.provincia" @blur="validateField('provincia')" :class="[
                            'border rounded-md px-3 py-2 text-sm text-gray-800 transition-colors duration-200',
                            'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                            errors.provincia ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white'
                        ]">
                            <option disabled value="">Seleccione una provincia</option>
                            <option v-for="prov in provincias" :key="prov" :value="prov">{{ prov }}</option>
                        </select>
                        <span v-if="errors.provincia" class="text-xs text-red-500">{{ errors.provincia }}</span>
                    </div>
                </div>

                <!-- Educación -->
                <div class="flex flex-col gap-4">
                    <h2 class="text-base font-semibold text-blue-600">Educación</h2>

                    <div v-for="(educacion, index) in educaciones" :key="index"
                        class="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col gap-4">

                        <div class="flex justify-between items-center border-b border-gray-100 pb-3">
                            <span class="text-sm font-medium text-gray-500">Educación {{ index + 1 }}</span>
                            <button v-if="educaciones.length > 1" type="button" @click="eliminarEducacion(index)"
                                class="text-xs text-red-400 hover:text-red-600 transition-colors duration-200">
                                Eliminar
                            </button>
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <BaseInput label="Institución" v-model="educacion.institucion"
                                placeholder="Ingrese la institución..." :error="educacion.errors.institucion"
                                @blur="validateEducacionField(index, 'institucion')" />
                            <BaseInput label="Título" v-model="educacion.titulo" placeholder="Ingrese el título..."
                                :error="educacion.errors.titulo" @blur="validateEducacionField(index, 'titulo')" />
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <BaseInput type="date" label="Fecha de inicio" v-model="educacion.fechaInicio"
                                :error="educacion.errors.fechaInicio"
                                @blur="validateEducacionField(index, 'fechaInicio')" />
                            <BaseInput v-if="!educacion.cursandoActualmente" type="date" label="Fecha de fin"
                                v-model="educacion.fechaFin" :error="educacion.errors.fechaFin"
                                @blur="validateEducacionField(index, 'fechaFin')" />
                        </div>

                        <label class="flex items-center gap-2 cursor-pointer w-fit">
                            <input type="checkbox" v-model="educacion.cursandoActualmente"
                                class="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                            <span class="text-sm text-gray-600">Cursando actualmente</span>
                        </label>
                    </div>

                    <button type="button" @click="agregarEducacion"
                        class="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium w-fit transition-colors duration-200">
                        + Agregar educación
                    </button>
                </div>

                <!-- Experiencia laboral -->
                <div class="flex flex-col gap-4">
                    <h2 class="text-base font-semibold text-blue-600">Experiencia laboral</h2>

                    <div v-for="(experiencia, index) in experiencias" :key="index"
                        class="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col gap-4">

                        <div class="flex justify-between items-center border-b border-gray-100 pb-3">
                            <span class="text-sm font-medium text-gray-500">Experiencia {{ index + 1 }}</span>
                            <button v-if="experiencias.length > 1" type="button" @click="eliminarExperiencia(index)"
                                class="text-xs text-red-400 hover:text-red-600 transition-colors duration-200">
                                Eliminar
                            </button>
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <BaseInput label="Empresa" v-model="experiencia.empresa" placeholder="Ingrese la empresa..."
                                :error="experiencia.errors.empresa"
                                @blur="validateExperienciaField(index, 'empresa')" />
                            <BaseInput label="Cargo" v-model="experiencia.cargo" placeholder="Ingrese el cargo..."
                                :error="experiencia.errors.cargo" @blur="validateExperienciaField(index, 'cargo')" />
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <BaseInput type="date" label="Fecha de inicio" v-model="experiencia.fechaInicio"
                                :error="experiencia.errors.fechaInicio"
                                @blur="validateExperienciaField(index, 'fechaInicio')" />
                            <BaseInput v-if="!experiencia.trabajandoActualmente" type="date" label="Fecha de fin"
                                v-model="experiencia.fechaFin" :error="experiencia.errors.fechaFin"
                                @blur="validateExperienciaField(index, 'fechaFin')" />
                        </div>

                        <label class="flex items-center gap-2 cursor-pointer w-fit">
                            <input type="checkbox" v-model="experiencia.trabajandoActualmente"
                                class="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                            <span class="text-sm text-gray-600">Trabajando actualmente</span>
                        </label>

                        <div class="flex flex-col gap-1.5">
                            <label class="text-sm font-medium text-gray-700">Descripción de tareas</label>
                            <textarea v-model="experiencia.descripcion"
                                @blur="validateExperienciaField(index, 'descripcion')"
                                placeholder="Describí tus responsabilidades y logros..." rows="3" :class="[
                                    'border rounded-md px-3 py-2 text-sm text-gray-800 transition-colors duration-200 resize-none',
                                    'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                                    'placeholder:text-gray-400',
                                    experiencia.errors.descripcion ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white'
                                ]" />
                            <span v-if="experiencia.errors.descripcion" class="text-xs text-red-500">{{
                                experiencia.errors.descripcion }}</span>
                        </div>
                    </div>

                    <button type="button" @click="agregarExperiencia"
                        class="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium w-fit transition-colors duration-200">
                        + Agregar experiencia
                    </button>
                </div>

                <!-- Submit -->
                <button type="submit"
                    class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors duration-200 shadow-sm">
                    Enviar
                </button>

            </form>
        </div>
    </div>
</template>