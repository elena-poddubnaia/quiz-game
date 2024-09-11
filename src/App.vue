<script setup>
import { ref } from 'vue'

const questions = ref([
  {
    question: 'Is it first question?',
    options: ['yes', 'no'],
    answer: 'yes',
    picked: ''
  },
  {
    question: 'Is it second question?',
    options: ['yes', 'no'],
    answer: 'yes',
    picked: ''
  }
])
</script>

<template>
  <main>
    <div v-for="(question, index) in questions" :key="index">
      <h1>{{ question.question }}</h1>

      <div v-for="option in question.options" :key="option">
        <input type="radio" :value="option" v-model="question.picked" />
        <label>{{ option }}</label>
      </div>

      {{ question.picked === '' ? '' : question.picked === question.answer ? 'correct' : 'wrong' }}

      <br />
    </div>
  </main>
</template>

<style scoped></style>
