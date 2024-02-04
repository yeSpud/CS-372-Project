<script setup>
import { ref } from "vue"
import { reset } from "@formkit/vue"

const myForm = ref(null)
const error = ref(null)
async function login() {
   // console.log(myForm.value.node["incomplete-message"])

    console.log("Login clicked!")
    if (myForm.value === null) {
        return
    }
    console.log(myForm.value.node.value)
    try {
        await fetch("https://localhost:8080/authenticaion/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: {
                "username": myForm.value.node.value.username,
                "password": myForm.value.node.value.password
            }
        })
    } catch (e) {
        if (e.hasOwnProperty("message")) {
            error.value = e.message
        } else {
            error.value = "Unknown error"
        }
        return
    }
    reset(myForm.value.node)
    error.value = null
}

async function signup() {
    console.log("Signup clicked!")
    if (myForm.value === null) {
        return
    }
    console.log(myForm.value.node.value)
    try {
        await fetch("https://localhost:8080/authenticaion/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: {
                "username": myForm.value.node.value.username,
                "password": myForm.value.node.value.password
            }
        })
    } catch (e) {
        if (e.hasOwnProperty("message")) {
            error.value = e.message
        } else {
            error.value = "Unknown error"
        }
        return
    }
    reset(myForm.value.node)
    error.value = null
}
</script>

<template>
    <main>
        <div v-if="error !== null" class="alert alert-danger" role="alert">
            Error: {{ error }}
        </div>
        <h2>Login</h2>
        <FormKit
            type="form"
            ref=myForm
            :actions="false">

            <!-- Username min of 4 characters, only a-z, and only 1 underscore -->
            <FormKit
                type="text"
                name="username"
                label="UID"
                :validation="[['required'],['matches', /^(?=[a-z]*_?[a-z]*$)[a-z_]{4,}$/]]"
                :validation-messages="{
                    required: 'A username is required',
                    matches: 'Username must be at least 4 characters of only lowercase letters and may have one underscore (_)'
                }"
                validation-visibility="live" />

            <!-- Password requires at last 8 characters, with one capital, one lowercase, one number, and one special character (not including a period) -->
            <FormKit
                type="password"
                name="password"
                label="pwd"
                :validation="[['required'],['contains_uppercase'],['contains_lowercase'],['contains_numeric'],['contains_symbol'],['matches', /^[^.]{8,}$/]]"
                validation-visibility="live"
                :validation-messages="{
                    required: 'A password is required',
                    matches: 'Password must be at least 8 and not include a period (.)'
                }"/>
            <div>
                <FormKit type="button" label="Login" @click="login" />
                <FormKit type="button" label="Signup" @click="signup" />
            </div>
        </FormKit>
    </main>
</template>

<style scoped>
body {
    background-color: #b7410e;
}
</style>
