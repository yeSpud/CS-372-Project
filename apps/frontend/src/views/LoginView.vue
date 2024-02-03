<script setup>
import { ref } from "vue"
import { reset } from "@formkit/vue"

const myForm = ref(null)
const error = ref(null)
async function login() {
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
            <FormKit
                type="text"
                name="username"
                label="UID"
                validation="required|min:4|alpha|lowercase|"
                validation-visibility="live" />
            <FormKit
                type="password"
                name="password"
                label="pwd"
                validation="required|min:8|contains_uppercase|contains_lowercase|contains_numeric|contains_symbol"
                validation-visibility="live" />
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
