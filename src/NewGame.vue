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

  <label for="options_input">Options:</label>
  <input id="options_input" v-model="option" />

  <button @click="options.push(option)">Add option</button>

  <label for="answer_input">Answer:</label>
  <input id="answer_input" v-model="answer" />

  <br />
  <button @click="handleOnClick">Add question</button>
</template>
