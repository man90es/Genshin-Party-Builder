import { createApp } from "vue"
import { createHead } from "@vueuse/head"
import App from "./App.vue"
import router from "./router"
import store from "./store"

createApp(App)
	.use(createHead())
	.use(router)
	.use(store)
	.mount("body")
