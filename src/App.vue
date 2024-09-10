<script setup>
import { ref } from 'vue'

const picked = ref('')
const pickedSecond = ref('')
const pickedThree = ref('')
const options = [1, 2, 3, 4]
const correctAnswer = 2

const questions = [
  {
    question: 'Is it first question?',
    options: ['yes', 'no'],
    answer: 'yes'
  }
]
</script>

<template>
  <main>
    <div v-for="(question, index) in questions" :key="index">
      <h1>{{ question.question }}</h1>

      <div v-for="option in question.options" :key="option">
        <input type="radio" :value="option" v-model="pickedThree" />
        <label>{{ option }}</label>
      </div>

      {{ pickedThree === '' ? '' : pickedThree === question.answer ? 'correct' : 'wrong' }}
      <br />
    </div>

    <h1>Is it second question?</h1>

    <input type="radio" value="yes" id="oneSecond" v-model="pickedSecond" />
    <label for="oneSecond">yes</label>
    <br />

    <input type="radio" value="no" id="twoSecond" v-model="pickedSecond" />
    <label for="twoSecond">no</label>
    <br />

    {{ pickedSecond === '' ? '' : pickedSecond === 'yes' ? 'correct' : 'wrong' }}
    <br />
  </main>
</template>

<style scoped></style>
