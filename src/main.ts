import { createApp } from "vue"
import { createHead } from "@vueuse/head"
import { createPinia } from "pinia"
import App from "./App.vue"
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"
import router from "./router"

const head = createHead()

const pinia = createPinia()
	.use(piniaPluginPersistedstate)

createApp(App)
	.use(head)
	.use(pinia)
	.use(router)
	.mount("body")
