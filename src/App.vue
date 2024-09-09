<script setup>
import { ref } from 'vue'

const picked = ref('')
</script>

<template>
  <main>
    <h1>Is it first question?</h1>

    <input type="radio" value="yes" id="one" v-model="picked" />
    <label for="one">yes</label>
    <br />

    <input type="radio" value="no" id="two" v-model="picked" />
    <label for="two">no</label>
    <br />

    {{ picked === '' ? '' : picked === 'yes' ? 'correct' : 'wrong' }}
  </main>
</template>

<style scoped></style>
