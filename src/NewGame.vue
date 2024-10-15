<script setup>
import { useStore } from 'vuex'

const store = useStore()
</script>

<template>
  New Game!

  <button @click="store.commit('addQuestion')">Add question</button>
</template>
