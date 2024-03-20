// makes a vue router that uses "/" for the home page and "/login" for the login page
// deletes loginSuccess query when going to home page from anywhere but the login page

import { createRouter, createWebHistory } from "vue-router"

import AddMovieView from "@/views/AddMovieView.vue"
import EditMovieView from "@/views/EditMovieView.vue"
import LoginView from "@/views/LoginView.vue"
import WatchMovieView from "@/views/WatchMovieView.vue"

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
    },
    {
      path: "/watch",
      name: "watch",
      component: WatchMovieView
    },
    {
      path: "/edit/:id",
      name: "edit",
      component: EditMovieView
    },
    {
      path: "/add",
      name: "add",
      component: AddMovieView
    }
  ]
})

export default router
