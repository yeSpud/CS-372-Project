<!-- content editor, add movie page -->
<script setup>
import { ref } from "vue"

import router from "@/router/index.js"
const myForm = ref(null)
const error = ref("")
const submitSuccess = ref(false)

async function addMovie() {
  submitSuccess.value = false
  if (myForm.value === null) {
    return
  }
  const data = JSON.stringify({
    name: myForm.value.node.value.name,
    genre: myForm.value.node.value.genre,
    movieLocation: myForm.value.node.value.movieUrl,
    comments: ""
  })

  try {
    const response = await fetch("http://localhost:8080/movies", {
      credentials: "include",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: data
    })

    if (response.ok) {
      submitSuccess.value = true
      error.value = ""
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
    <FormKit class="form-group" type="form" ref="myForm" @submit="addMovie" :actions="false">
      <FormKit
        type="text"
        name="name"
        label="Movie Name"
        input-class="form-control"
        :validation="[['required']]"
        :validation-messages="{
          required: 'A movie name is required',
          characterMax: 'Movie name must be under 200 characters long'
        }"
        validation-visibility="live"
      />

      <FormKit
        type="select"
        name="genre"
        label="Genre"
        placeholder="Select genre"
        input-class="form-control"
        :options="genreList"
        :validation="[['required']]"
        :validation-messages="{
          required: 'A movie name is required',
          characterMax: 'Movie name must be under 200 characters long'
        }"
      />

      <FormKit
        type="text"
        name="movieUrl"
        label="Movie URL"
        input-class="form-control"
        validation="required"
        validation-visibility="live"
        :validation-messages="{
          required: 'A movie URL is required'
        }"
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
