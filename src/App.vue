<script setup>
import { ref } from 'vue'

const picked = ref('')
const pickedSecond = ref('')
const pickedThree = ref('')
const options = [1, 2, 3, 4]
const correctAnswer = 2
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

    <h1>Is it second question?</h1>

    <input type="radio" value="yes" id="oneSecond" v-model="pickedSecond" />
    <label for="oneSecond">yes</label>
    <br />

    <input type="radio" value="no" id="twoSecond" v-model="pickedSecond" />
    <label for="twoSecond">no</label>
    <br />

    {{ pickedSecond === '' ? '' : pickedSecond === 'yes' ? 'correct' : 'wrong' }}
    <br />

    <div v-for="option in options" :key="option">
      <input type="radio" :value="option" v-model="pickedThree" />
      <label>{{ option }}</label>
    </div>

    {{ pickedThree === '' ? '' : pickedThree === correctAnswer ? 'correct' : 'wrong' }}
  </main>
</template>

<style scoped></style>
