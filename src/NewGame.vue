<script setup>
import { useStore } from 'vuex'

const store = useStore()
</script>

<template>
  New Game!

  <button
    @click="
      store.commit('addQuestion', {
        question: 'Hello world?',
        options: ['yes', 'no'],
        answer: 'no',
        picked: ''
      })
    "
  >
    Add question
  </button>
</template>
