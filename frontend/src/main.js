import { defaultConfig, plugin } from "@formkit/vue"
import { createPinia } from "pinia"
import { createApp } from "vue"

import { characterCount, characterMin, customLowercase } from "@/util.js"

import App from "./App.vue"
import router from "./router"

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(plugin, defaultConfig({ rules: { characterMin, customLowercase, characterCount } }))

app.mount("#app")
