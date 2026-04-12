<template>
    <div class="grid-cols-1 w-4/5 mx-auto">
        <div v-for="data in dataCandidato" :key="data.idCandidato"
            class="bg-gray-900 border border-blue-500 rounded-2xl p-6 shadow-lg shadow-blue-900/20 hover:border-blue-400 transition-all">
            <div class="flex items-center gap-4 mb-4">
                <div
                    class="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xl">
                    {{ data.nombre[0] }}{{ data.apellido[0] }}
                </div>
                <div>
                    <h2 class="text-white font-semibold text-lg">{{ data.nombre }} {{ data.apellido }}</h2>
                    <p class="text-blue-400 text-sm">{{ data.email }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const dataCandidato = ref([]);
onMounted(() => {
    async function getData() {
        try {
            const res = await fetch("http://localhost:3000/candidatos");
            if (!res.ok) throw new Error("Error" + res.status);
            const data = await res.json();
            dataCandidato.value = data;
        } catch (error) {
            console.log(error);
        }
    }
    getData()
})
</script>