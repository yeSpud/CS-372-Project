<script setup>
import { ref } from "vue"

import router from "@/router/index.js"

const myForm = ref(null)
const error = ref("")
const signupSuccess = ref(false)

async function login(credentials) {
  signupSuccess.value = false
  try {
    const response = await fetch("http://localhost:8080/authentication/login", {
      credentials: "include",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials)
    })

    if (response.ok) {
      error.value = ""
      await router.push({
        name: "home",
        query: { loginSuccess: null }
      })
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

async function signup() {
  signupSuccess.value = false
  if (myForm.value === null) {
    return
  }

  const data = JSON.stringify({
    username: myForm.value.node.value.username,
    password: myForm.value.node.value.password
  })

  try {
    const response = await fetch("http://localhost:8080/authentication/signup", {
      credentials: "include",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: data
    })

    if (response.ok) {
      signupSuccess.value = true
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
</script>

<template>
  <main class="container">
    <div v-if="error !== ''" class="alert alert-danger" role="alert">Error: {{ error }}</div>
    <div v-if="signupSuccess" class="alert alert-success" role="alert">Successfully signed up!</div>
    <h2 align="center">Login</h2>
    <FormKit class="form-group" type="form" ref="myForm" @submit="login" :actions="false">
      <!-- Username min of 4 characters, only a-z, and only 1 underscore -->
      <FormKit
        type="text"
        name="username"
        label="UID"
        input-class="form-control"
        :validation="[
          ['required'],
          ['customLowercase'],
          ['characterCount', '_', 0, 1],
          ['characterMin', 4]
        ]"
        :validation-messages="{
          required: 'A username is required',
          customLowercase: 'Username must be all lowercase (and can include an underscore)',
          characterCount: 'Username can only contain up to one underscore (_)',
          characterMin: 'Username must be at least 4 characters long'
        }"
        validation-visibility="live"
      />

      <!-- Password requires at last 8 characters, with one capital, one lowercase, one number, and one special character (not including a period) -->
      <FormKit
        type="password"
        name="password"
        label="pwd"
        input-class="form-control"
        :validation="[
          ['required'],
          ['contains_uppercase'],
          ['contains_lowercase'],
          ['contains_numeric'],
          ['contains_symbol'],
          ['characterMin', 8],
          ['matches', /^[^.]*$/]
        ]"
        validation-visibility="live"
        :validation-messages="{
          required: 'A password is required',
          contains_uppercase: 'Password must contain an uppercase letter',
          contains_lowercase: 'Password must contain a lowercase letter',
          contains_numeric: 'Password must contain a number',
          contains_symbol: 'Password must contain a symbol (not including a period)',
          characterMin: 'Password must be at least 8 characters long',
          matches: 'Password must not include a period'
        }"
      />
      <div class="row btn-group btn-group-lg" role="group">
        <FormKit input-class="btn" type="submit" label="Login" />
        <FormKit input-class="btn" type="button" label="Signup" @click="signup" />
      </div>
    </FormKit>
  </main>
</template>

<style>
body {
  background-color: #b7410e;
}
</style>
