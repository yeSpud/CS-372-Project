<script setup>
import { ref } from "vue"
import { reset } from "@formkit/vue"

const myForm = ref(null)
async function login() {
    console.log("Login clicked!")
    console.log(myForm.value.node.value)
    // TODO Send request to server
    reset(myForm.value.node)
}

async function signup() {
    console.log("Signup clicked!")
    console.log(myForm.value.node.value)
    // TODO Send request to server
    reset(myForm.value.node)
}
</script>

<template>
    <main>
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
