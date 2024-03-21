<script setup>

import { onMounted, ref } from "vue"
import { useRoute } from "vue-router"

import router from "@/router/index.js"

const route = useRoute()

const movie = ref(null)

onMounted(async () => {
  const response = await fetch(`http://localhost:8080/movies/${route.params.id}`, { credentials: "include" })
  console.log(response)
  if (!response.ok) {
    return
  }

  movie.value = await response.json()
})

async function submit(data) {
  console.log(data)
}
</script>

<template>
  <main class="container">
    <FormKit
      v-if="movie !== null"
      class="form-group"
      type="form"
      :actions="false"
      @submit="submit"
      :value="movie">
      <FormKit
        type="text"
        name="name"
        label="Title"
        input-class="form-control"
      />
      <FormKit
        type="text"
        name="genre"
        label="Genre"
        input-class="form-control"
      />
      <FormKit
        type="text"
        name="movieLocation"
        label="Movie file location"
        input-class="form-control"
      />
      <FormKit
        type="checkbox"
        name="shown"
        label="Shown"
        input-class="form-control"
      />
      <div class="row btn-group btn-group-lg" role="group">
        <FormKit input-class="btn" type="submit" label="Save" />
        <FormKit input-class="btn" type="button" label="Back" @click="router.back()" />
      </div>
    </FormKit>
  </main>
</template>

<style scoped></style>
