<script setup>
</script>

<template>
    <main>
        <h2>Login</h2>
        <FormKit
            type="text"
            label="UID"
            validation="required|min:4|alpha|lowercase|"
            validation-visibility="live" />

        <FormKit
            type="password"
            label="pwd"
            validation="required|min:8|contains_uppercase|contains_lowercase|contains_numeric|contains_symbol"
            validation-visibility="live" />

        <button>Login</button>
      <button>Signup</button>
    </main>
</template>

<style scoped></style>
