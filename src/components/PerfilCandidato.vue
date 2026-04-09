<script setup>
import { ref, onMounted } from "vue";
import { db } from "@/db/db.js";

const candidato = ref(null);
const educaciones = ref([]);
const experiencias = ref([]);

onMounted(async () => {
    candidato.value = await db.candidato.toCollection().first();
    educaciones.value = await db.educaciones.toArray();
    experiencias.value = await db.experiencias.toArray();
});

function formatFecha(fecha) {
    if (!fecha) return "Actualidad";
    const [year, month, day] = fecha.split("-");
    return `${day}/${month}/${year}`;
}

function limpiarFormulario() {
    Object.keys(form).forEach(k => (form[k] = ""));
    form.foto = "";

    educaciones.value = [{
        institucion: "",
        titulo: "",
        fechaInicio: "",
        fechaFin: "",
        cursandoActualmente: false,
        errors: { institucion: "", titulo: "", fechaInicio: "", fechaFin: "" }
    }];

    experiencias.value = [{
        empresa: "",
        cargo: "",
        fechaInicio: "",
        fechaFin: "",
        trabajandoActualmente: false,
        descripcion: "",
        errors: { empresa: "", cargo: "", fechaInicio: "", fechaFin: "", descripcion: "" }
    }];
}
</script>

<template>
    <div class="min-h-screen bg-gray-50 py-10 px-4">
        <div class="max-w-2xl mx-auto flex flex-col gap-6">

            <div v-if="!candidato" class="text-center text-gray-400 py-20">
                No hay datos cargados todavía.
            </div>

            <template v-else>

                <!-- Header -->
                <div class="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                    <div class="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                        <div class="flex items-center gap-4">
                            <img v-if="candidato.foto" :src="candidato.foto"
                                class="w-20 h-20 rounded-full object-cover border-2 border-blue-100" />
                            <div v-else
                                class="w-20 h-20 rounded-full bg-blue-50 border-2 border-blue-100 flex items-center justify-center text-2xl text-blue-300">
                                👤
                            </div>
                            <div>
                                <h1 class="text-2xl font-bold text-gray-900">{{ candidato.nombre }} {{
                                    candidato.apellido }}</h1>
                                <p class="text-sm text-gray-500 mt-1">{{ candidato.provincia }}</p>
                            </div>
                        </div>

                        <div class="flex flex-col gap-1 mt-4 text-sm text-gray-600">
                            <span>📧 {{ candidato.email }}</span>
                            <span>📞 {{ candidato.telefono }}</span>
                            <a v-if="candidato.linkedin" :href="candidato.linkedin" target="_blank"
                                class="text-blue-600 hover:underline">🔗 LinkedIn</a>
                            <a v-if="candidato.website" :href="candidato.website" target="_blank"
                                class="text-blue-600 hover:underline">🌐 Website</a>
                        </div>
                    </div>
                    <h1 class="text-2xl font-bold text-gray-900">{{ candidato.nombre }} {{ candidato.apellido }}</h1>
                    <p class="text-sm text-gray-500 mt-1">{{ candidato.provincia }}</p>

                    <div class="flex flex-col gap-1 mt-4 text-sm text-gray-600">
                        <span>📧 {{ candidato.email }}</span>
                        <span>📞 {{ candidato.telefono }}</span>
                        <a v-if="candidato.linkedin" :href="candidato.linkedin" target="_blank"
                            class="text-blue-600 hover:underline">🔗 LinkedIn</a>
                        <a v-if="candidato.website" :href="candidato.website" target="_blank"
                            class="text-blue-600 hover:underline">🌐 Website</a>
                    </div>
                </div>

                <!-- Educación -->
                <div class="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col gap-4">
                    <h2 class="text-base font-semibold text-blue-600 border-b border-gray-100 pb-3">Educación</h2>

                    <div v-for="(edu, index) in educaciones" :key="index" class="flex flex-col gap-1">
                        <span class="font-medium text-gray-800">{{ edu.titulo }}</span>
                        <span class="text-sm text-gray-500">{{ edu.institucion }}</span>
                        <span class="text-xs text-gray-400">
                            {{ formatFecha(edu.fechaInicio) }} —
                            {{ edu.cursandoActualmente ? "Actualidad" : formatFecha(edu.fechaFin) }}
                        </span>
                    </div>
                </div>

                <!-- Experiencia -->
                <div class="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col gap-4">
                    <h2 class="text-base font-semibold text-blue-600 border-b border-gray-100 pb-3">Experiencia laboral
                    </h2>

                    <div v-for="(exp, index) in experiencias" :key="index" class="flex flex-col gap-1">
                        <span class="font-medium text-gray-800">{{ exp.cargo }}</span>
                        <span class="text-sm text-gray-500">{{ exp.empresa }}</span>
                        <span class="text-xs text-gray-400">
                            {{ formatFecha(exp.fechaInicio) }} —
                            {{ exp.trabajandoActualmente ? "Actualidad" : formatFecha(exp.fechaFin) }}
                        </span>
                        <p class="text-sm text-gray-600 mt-1">{{ exp.descripcion }}</p>
                    </div>
                </div>

                <!-- Editar -->
                <RouterLink to="/"
                    class="w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors duration-200 shadow-sm">
                    Editar perfil
                </RouterLink>

            </template>
        </div>
    </div>
</template>