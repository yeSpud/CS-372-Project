<!-- Vue code for the home page, has a login link and when user is logged in, has a hyperlink to logout-->

<script setup>
import { onMounted, ref } from "vue"
import { useRoute } from "vue-router"

import router from "@/router/index.js"

const route = useRoute()

const user = ref(null)
const movieGenres = ref([])
// const movies = ref([])

onMounted(async () => {
  const getUser = await fetch("http://localhost:8080/users/@me", { credentials: "include" })
  user.value = getUser.ok ? await getUser.json() : null

  const moviesRequest = await fetch("http://localhost:8080/movies", { credentials: "include" })
  if (!moviesRequest.ok) {
    return
  }

  const movies = await moviesRequest.json()
  for (const movie of movies) {
    const entry = movieGenres.value.find(movieGenre => movieGenre.name === movie.genre)
    if (entry === undefined) {
      movieGenres.value.push({
        name: movie.genre,
        movies: [movie]
      })
    } else {
      entry.movies.push(movie)
    }
  }
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
      <div v-for="movieGenre in movieGenres" :key="movieGenre.name">
        <h3 style="color: white">{{movieGenre.name}}</h3>
        <ul class="thumbnail-list">
          <li v-for="movie in movieGenre.movies" :key="movie.id">
            <span>
              <img class="thumbnail-image" src="https://i5.walmartimages.com/seo/Bush-s-Original-Baked-Beans-Canned-Beans-117-oz-Can_b95fb31e-cee4-4f18-b8aa-dc2b17a35029.0a8defea62601b211cd8326484492eb6.jpeg">
              <p>{{movie.name}}</p>
            </span>
          </li>
        </ul>
      </div>
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
