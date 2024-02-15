<script setup>
import { onMounted, ref } from "vue"
import { useRoute } from "vue-router"

const route = useRoute()

const user = ref(null)

onMounted(async () => {
  const response = await fetch("http://localhost:8080/users/@me", { credentials: "include" })
  if (response.ok) {
    user.value = await response.json()
  } else {
    user.value = null
  }
})
</script>

<template>
  <main>
    <!--<TheWelcome />-->
    <div v-if="route.query.hasOwnProperty('loginSuccess')" class="alert alert-success" role="alert">
      Successfully signed in!
    </div>
    <p style="color: white">TODO: Main page stuff</p>
    <RouterLink :to="{ name: 'login' }">Link to login page</RouterLink>
    <p v-if="user !== null" style="color: white">Logged in as {{ user.username }}</p>
    <a v-if="user !== null" href="http://localhost:8080/authentication/logout">Logout</a>
  </main>
</template>
