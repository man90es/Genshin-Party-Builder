import { createApp } from "vue"
import mitt from "mitt"

import App from "./App.vue"
import router from "./router"
import store from "./store"

window.mitt = window.mitt || new mitt()

createApp(App)
	.use(router)
	.use(store)
	.mount("body")
