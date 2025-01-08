<script setup lang="ts">
import { useStore } from 'vuex'
import { ref } from 'vue'

const store = useStore()
const question = ref('')
const option = ref('')
const answer = ref('')
const options = ref<string[]>([])

const handleOnClick = (e: any) => {
  e.preventDefault()
  store.commit('addQuestion', {
    question,
    options,
    answer,
    picked: ''
  })
  window.location.hash = '#/'
}

const addOption = (): void => {
  options.value.push(option.value)
  option.value = ''
}

const removeOption = (option: string): void => {
  options.value = options.value.filter((o) => o !== option)
}
</script>

<template>
  New Game!
  <form @submit="handleOnClick">
    <label for="question_input">Question:</label>
    <input id="question_input" v-model="question" required />
    <br />

    <label for="options_input">Options:</label>
    <input id="options_input" v-model="option" />

    <button @click="addOption">Add option</button>
    <br />

    <div v-for="option in options" :key="option" :data-testid="`option-${option}`">
      <label class="option-label" :data-testid="`option-label-${option}`">
        <input type="radio" v-model="answer" :value="option" />{{ option }}
      </label>
      <button @click="removeOption(option)">X</button>
    </div>

    <br />
    <button type="submit">Add question</button>
  </form>
</template>

<style>
.option-label {
  display: block;
}
</style>
