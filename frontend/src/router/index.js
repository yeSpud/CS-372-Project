import { createRouter, createWebHistory } from "vue-router"

import LoginView from "@/views/LoginView.vue"

import HomeView from "../views/HomeView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      beforeEnter: (to, from) => {
        if (from.name === "login") {
          return
        }
        const newQuery = to.query
        delete newQuery.loginSuccess
        to.query = newQuery
      }
    },
    {
      path: "/login",
      name: "login",
      component: LoginView
    }
  ]
})

export default router
