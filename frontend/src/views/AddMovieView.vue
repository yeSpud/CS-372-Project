<!-- content editor, add movie page -->
<script setup>
import { ref } from "vue"

import router from "@/router/index.js"
const error = ref("")
const submitSuccess = ref(false)

async function addMovie(data) {
  submitSuccess.value = false
  error.value = ""

  try {
    const response = await fetch("http://localhost:8080/movies", {
      credentials: "include",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })

    if (response.ok) {
      submitSuccess.value = true
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

const genreList = ["Action", "Scifi", "Thriller", "Romance", "Drama"]
</script>

<template>
  <main class="container">
    <h2 align="center" style="color: white">Add A Movie</h2>
    <div v-if="error !== ''" class="alert alert-danger" role="alert">Error: {{ error }}</div>
    <div v-if="submitSuccess" class="alert alert-success" role="alert">
      Successfully added movie!
    </div>
    <FormKit class="form-group" type="form" @submit="addMovie" :actions="false">
      <FormKit
        type="text"
        name="name"
        label="Movie Name"
        input-class="form-control"
        validation="required"
        :validation-messages="{ required: 'A movie name is required' }"
        validation-visibility="live"
      />

      <FormKit
        type="select"
        name="genre"
        label="Genre"
        placeholder="Select genre"
        input-class="form-control"
        :options="genreList"
        validation="required"
        :validation-messages="{ required: 'A movie genre is required' }"
      />

      <FormKit
        type="text"
        name="movieLocation"
        label="Movie URL"
        input-class="form-control"
        validation="required"
        validation-visibility="live"
        :validation-messages="{ required: 'A movie URL is required' }"
      />

      <div class="row btn-group btn-group-lg" role="group">
        <FormKit
          input-class="btn"
          type="button"
          label="Cancle"
          @click="router.push({ name: 'home' })"
        />
        <FormKit input-class="btn" type="submit" label="Submit" />
      </div>
    </FormKit>
  </main>
</template>

<style scoped></style>
