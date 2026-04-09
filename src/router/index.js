import { createRouter, createWebHistory } from "vue-router";
import FormularioCandidato from "@/components/InformacionCandidato.vue";
import PerfilCandidato from "@/components/PerfilCandidato.vue";

const routes = [
  { path: "/", component: FormularioCandidato },
  { path: "/perfil", component: PerfilCandidato },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
