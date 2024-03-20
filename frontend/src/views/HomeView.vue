<!-- Vue code for the home page, has a login link and when user is logged in, has a hyperlink to logout-->

<script setup>
import { onMounted, ref } from "vue"
import { useRoute } from "vue-router"

import router from "@/router/index.js"

const route = useRoute()

const user = ref(null)
const movies = ref([])

onMounted(async () => {
  const getUser = await fetch("http://localhost:8080/users/@me", { credentials: "include" })
  user.value = getUser.ok ? await getUser.json() : null

  const moviesRequest = await fetch("http://localhost:8080/movies", { credentials: "include" })
  if (!moviesRequest.ok) {
    return
  }

  movies.value = await moviesRequest.json()
})
</script>

<template>
  <main>
    <template v-if="user === null">
      <div class="d-flex justify-content-end">
        <button type="button" class="btn btn-primary btn-lg" @click="router.push({name: 'login'})">Login / Signup</button>
      </div>
      <h2 style="color: white; text-align: center">You need to log in to view movies</h2>
    </template>
    <template v-else>
      <div class="d-flex justify-content-end">
        <h3 class="col-auto" style="color: white">Logged in as: {{user.username}}!</h3>
        <a href="http://localhost:8080/authentication/signout">
          <button type="button" class="btn btn-danger btn-lg col-auto">Logout</button>
        </a>
      </div>
      <div class="w-100"></div>
      <div v-if="route.query.hasOwnProperty('loginSuccess')" class="alert alert-success" role="alert">
        Successfully signed in!
      </div>
      <ul v-for="movie in movies" :key="movie.id">
        <li style="color: white">{{movie.name}}</li>
      </ul>
    </template>
  </main>
</template>

<style scoped>
.thumbnail-image {
  display: block;
  padding:2px;
  max-width: 200px;
  height:auto;
}

.thumbnail-list li {
  display: inline-block;
}

</style>
