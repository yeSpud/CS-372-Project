import { defaultConfig, plugin } from "@formkit/vue"
import { createPinia } from "pinia"
import { createApp } from "vue"

import App from "./App.vue"
import router from "./router"

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(plugin, defaultConfig)

app.mount("#app")
