<script setup>
import { useStore } from 'vuex'
import { ref } from 'vue'

const store = useStore()
const questionTitle = ref('')
</script>

<template>
  New Game!
  <p>Question:</p>
  <input v-model="questionTitle" />

  <button
    @click="
      store.commit('addQuestion', {
        question: questionTitle,
        options: ['yes', 'no'],
        answer: 'no',
        picked: ''
      })
    "
  >
    Add question
  </button>
</template>
