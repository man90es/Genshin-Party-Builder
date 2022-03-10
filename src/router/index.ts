import { createRouter, createWebHistory } from "vue-router"

export default createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes: [
		{ path: "/",                  name: "landing",      component: () => import("@/views/LandingView.vue") },
		{ path: "/my-characters",     name: "characters",   component: () => import("@/views/CharactersView.vue") },
		{ path: "/my-parties",        name: "parties",      component: () => import("@/views/PartiesView.vue") },
		{ path: "/my-parties/:index", name: "partyByilder", component: () => import("@/views/PartyBuilderView.vue") },
	]
})
