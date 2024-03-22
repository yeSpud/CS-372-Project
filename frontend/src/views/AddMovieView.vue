<!-- content editor, add movie page -->
<script setup>
import { ref } from "vue"

import router from "@/router/index.js"
const myForm = ref(null)
const error = ref("")

async function addMovie(movieComponents) {
}
const genreList2 = [{ label: 'Action', value: 'action'}, { label: 'Scifi', value: 'scifi'}, { label: 'Thriller', value: 'thriller'}, { label: 'Romance', value: 'romance'}, { label: 'Drama', value: 'drama'},]

const genreList = ['Action', 'Scifi', 'Thriller', 'Romance', 'Drama']
</script>

<template>
  <main class="container">
    <h2 align="center" style="color: white">Add A Movie</h2>
    <FormKit class="form-group" type="form" #default="{ value }" ref="myForm" @submit="addMovie" :actions="false">
      
      <FormKit
        type="text"
        name="name"
        label="Movie Name"
        input-class="form-control"
        :validation="[
          ['required']
        ]"
        :validation-messages="{
          required: 'A movie name is required',
          characterMax: 'Movie name must be under 200 characters long'
        }"
        validation-visibility="live"
      />
      
      <FormKit 
        type="select"
        name="genre"
        label="Genre(s)"
        placeholder=" "
        input-class="form-control" 
        :options="genreList"
        :validation="[
          ['required']
        ]"
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
        :validation="[
          ['required']
        ]"
        validation-visibility="live"
        :validation-messages="{
          required: 'A movie URL is required'
        }"
      />
      
      <div class="row btn-group btn-group-lg" role="group">
        <FormKit input-class="btn" type="button" label="Cancle" />
        <FormKit input-class="btn" type="submit" label="Submit" />
      </div>
    </FormKit>
  </main>
</template>

<style scoped></style>
