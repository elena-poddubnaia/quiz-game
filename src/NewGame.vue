<script setup>
import { useStore } from 'vuex'
import { ref } from 'vue'

const store = useStore()
const question = ref('')
const option = ref('')
const answer = ref('')
const options = []

const handleOnClick = () => {
  store.commit('addQuestion', {
    question,
    options,
    answer,
    picked: ''
  })
  window.location.hash = '#/'
}
</script>

<template>
  New Game!
  <label for="question_input">Question:</label>
  <input id="question_input" v-model="question" />

  <p>Options:</p>
  <input v-model="option" />
  <button @click="options.push(option)">Add option</button>

  <p>Answer:</p>
  <input v-model="answer" />

  <br />
  <button @click="handleOnClick">Add question</button>
</template>
