<script setup lang="ts">
import { ref, computed, type Component } from 'vue'
import PlayGame from './PlayGame.vue'
import NewGame from './NewGame.vue'

type Routes = Record<string, Component>

const routes: Routes = {
  '/': PlayGame,
  '/new': NewGame
}

const currentPath = ref<string>(window.location.hash)

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
