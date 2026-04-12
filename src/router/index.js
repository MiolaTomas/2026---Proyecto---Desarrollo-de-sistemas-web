import { createRouter, createWebHistory } from "vue-router";
import FormularioCandidato from "@/components/InformacionCandidato.vue";
import PerfilCandidato from "@/components/PerfilCandidato.vue";
import ListaCandidatos from "@/components/ListaCandidatos.vue";

const routes = [
  { path: "/", component: FormularioCandidato },
  { path: "/perfil/:id", component: PerfilCandidato },
  { path: "/candidatos", component: ListaCandidatos },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
