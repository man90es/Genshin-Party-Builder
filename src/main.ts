import { createApp } from "vue"
import { createHead } from "@vueuse/head"
import { createPinia } from "pinia"
import { createRouter, createWebHistory } from "vue-router"
import App from "./App.vue"
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"

const head = createHead()

const pinia = createPinia()
	.use(piniaPluginPersistedstate)

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes: [
		{ path: "/", name: "landing", component: () => import("@/views/LandingView.vue") },
		{ path: "/leaderboard", name: "leaderboard", component: () => import("@/views/LeaderboardView.vue") },
		{ path: "/my-characters", name: "characters", component: () => import("@/views/CharactersView.vue") },
		{ path: "/my-parties", name: "parties", component: () => import("@/views/PartiesView.vue") },
		{ path: "/my-parties/:index", name: "partyByilder", component: () => import("@/views/PartyBuilderView.vue") },
	]
})

createApp(App)
	.use(head)
	.use(pinia)
	.use(router)
	.mount("body")
