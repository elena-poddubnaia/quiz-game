<script setup>
import { useStore } from 'vuex'
import { ref } from 'vue'

const store = useStore()
const questionTitle = ref('')
const option = ref('')

const handleOnClick = () => {
  store.commit('addQuestion', {
    question: questionTitle,
    options: [option],
    answer: 'no',
    picked: ''
  })
  window.location.hash = '#/'
}
</script>

<template>
  New Game!
  <p>Question:</p>
  <input v-model="questionTitle" />

  <p>Options:</p>
  <input v-model="option" />

  <button @click="handleOnClick">Add question</button>
</template>
