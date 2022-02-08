import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import mitt from 'mitt'

window.mitt = window.mitt || new mitt()

createApp(App).use(store).mount("body")
