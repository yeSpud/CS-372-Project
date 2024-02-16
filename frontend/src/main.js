import { defaultConfig, plugin } from "@formkit/vue"
import { createPinia } from "pinia"
import { createApp } from "vue"

import characterMin from "@/util.js"

import App from "./App.vue"
import router from "./router"

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(plugin, defaultConfig({ rules: { characterMin } }))

app.mount("#app")
