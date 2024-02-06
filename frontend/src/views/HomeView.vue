<script setup>
import { useRoute } from "vue-router"

const route = useRoute()
</script>

<template>
  <main>
    <!--<TheWelcome />-->
    <div v-if="route.query.hasOwnProperty('loginSuccess')" class="alert alert-success" role="alert">
      Successfully signed in!
    </div>
    TODO: Main page stuff
    <br />
    <RouterLink :to="{ name: 'login' }">Link to login page</RouterLink>
  </main>
</template>
