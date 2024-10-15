<script setup>
import { useStore } from 'vuex'
import { ref } from 'vue'

const store = useStore()
const questionTitle = ref('')

const handleOnClick = () => {
  store.commit('addQuestion', {
    question: questionTitle,
    options: ['yes', 'no'],
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

  <button @click="handleOnClick">Add question</button>
</template>
