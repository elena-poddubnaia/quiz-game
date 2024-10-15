<script setup>
import { ref, computed } from 'vue'
import PlayGame from './PlayGame.vue'

const routes = {
  '/': PlayGame
}

const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/']
})
</script>

<template>
  <component :is="currentView" />
</template>
