<script setup>
import { ref } from "vue"

import router from "@/router/index.js"

const myForm = ref(null)
const error = ref(null)
const signupSuccess = ref(false)

async function login(credentials) {
  signupSuccess.value = false
  try {
    const response = await fetch("http://localhost:8080/authentication/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials)
    })

    if (response.ok) {
      // TODO Set user from response

      await router.push({
        name: "home",
        query: { loginSuccess: null }
      })
    }
  } catch (e) {
    if (Object.prototype.hasOwnProperty.call(e, "message")) {
      error.value = e.message
    } else {
      error.value = "Unknown error"
    }
    return
  }
  error.value = null
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
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: data
    })

    if (response.ok) {
      signupSuccess.value = true
      error.value = null
      return
    }
    error.value = await response.text()
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
    <div v-if="error !== null" class="alert alert-danger" role="alert">Error: {{ error }}</div>
    <div v-if="signupSuccess" class="alert alert-success" role="alert">Successfully signed up!</div>
    <h2 align="center">Login</h2>
    <FormKit class="form-group" type="form" ref="myForm" @submit="login" :actions="false">
      <!-- Username min of 4 characters, only a-z, and only 1 underscore -->
      <FormKit
        type="text"
        name="username"
        label="UID"
        input-class="form-control"
        :validation="[['required'], ['matches', /^(?=[a-z]*_?[a-z]*$)[a-z_]{4,}$/]]"
        :validation-messages="{
          required: 'A username is required',
          matches:
            'Username must be at least 4 characters of only lowercase letters and may have one underscore (_)'
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
          ['matches', /^[^.]{8,}$/]
        ]"
        validation-visibility="live"
        :validation-messages="{
          required: 'A password is required',
          matches: 'Password must be at least 8 and not include a period (.)'
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
