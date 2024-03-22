<script setup>
import { onMounted, ref } from "vue"
import { useRoute } from "vue-router"

import router from "@/router/index.js"

const route = useRoute()

const user = ref(null)
const movie = ref(null)

const success = ref(false)
const error = ref("")

onMounted(async () => {
  const getUser = await fetch("http://localhost:8080/users/@me", { credentials: "include" })
  user.value = getUser.ok ? await getUser.json() : null

  const response = await fetch(`http://localhost:8080/movies/${route.params.id}`, {
    credentials: "include"
  })
  console.log(response)
  if (!response.ok) {
    return
  }

  movie.value = await response.json()
})

async function submit(data) {
  error.value = ""
  success.value = false

  const diff = {}
  for (const [key, value] of Object.entries(data)) {
    if (value instanceof Array) {
      continue
    }

    if (movie.value[key] !== value) {
      diff[key] = value
    }
  }

  try {
    const response = await fetch(`http://localhost:8080/movies/${route.params.id}`, {
      credentials: "include",
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(diff)
    })

    if (response.ok) {
      success.value = true
    } else {
      const json = await response.json()
      error.value = json.message
    }
  } catch (e) {
    if (Object.prototype.hasOwnProperty.call(e, "message")) {
      error.value = e.message
    } else {
      error.value = "Unknown error"
    }
  }
}
</script>

<template>
  <main v-if="user !== null" class="container">
    <div v-if="error !== ''" class="alert alert-danger" role="alert">Error: {{ error }}</div>
    <div v-if="success" class="alert alert-success" role="alert">
      Movie details updated successfully!
    </div>
    <FormKit
      v-if="movie !== null"
      class="form-group"
      type="form"
      :actions="false"
      @submit="submit"
      :value="movie"
    >
      <template v-if="user.accountType === 'CONTENT_EDITOR'">
        <FormKit type="text" name="name" label="Title" input-class="form-control" />
        <FormKit type="text" name="genre" label="Genre" input-class="form-control" />
        <FormKit
          type="text"
          name="movieLocation"
          label="Movie file location"
          input-class="form-control"
        />
        <FormKit type="checkbox" name="shown" label="Shown" input-class="form-control" />
        <FormKit
          type="textarea"
          name="comments"
          label="Comments"
          input-class="form-control"
          disabled="true"
        />
      </template>
      <template v-else-if="user.accountType === 'MARKETING_MANAGER'">
        <FormKit type="text" name="name" label="Title" input-class="form-control" disabled="true" />
        <FormKit
          type="text"
          name="genre"
          label="Genre"
          input-class="form-control"
          disabled="true"
        />
        <FormKit
          type="checkbox"
          name="shown"
          label="Shown"
          input-class="form-control"
          disabled="true"
        />
        <p style="color: white">Views: {{ movie.views }}</p>
        <p style="color: white">Likes: {{ movie.likes.length }}</p>
        <FormKit type="textarea" name="comments" label="Comments" input-class="form-control" />
      </template>
      <div class="row btn-group btn-group-lg" role="group">
        <FormKit input-class="btn" type="button" label="Back" @click="router.back()" />
        <FormKit input-class="btn" type="submit" label="Save" />
      </div>
    </FormKit>
  </main>
</template>

<style scoped></style>
