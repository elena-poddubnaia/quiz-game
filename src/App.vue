<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const showResults = ref(false)

function onSubmit() {
  showResults.value = true
}

const questions = computed(() => store.getters.questions2)
</script>

<template>
  <main>
    <div v-for="(question, index) in questions" :key="index">
      <h1>{{ question.question }}</h1>

      <div v-for="option in question.options" :key="option">
        <input
          type="radio"
          :checked="option === question.picked"
          :disabled="showResults"
          @change="() => store.commit('pick', { index, option })"
        />
        <label>{{ option }}</label>
      </div>

      {{
        question.picked === '' || !showResults ? '' : question.hasRightAnswer ? 'correct' : 'wrong'
      }}

      <br />
    </div>

    <button @click="onSubmit" :disabled="questions.filter((i) => i.picked === '').length != 0">
      Submit
    </button>
  </main>
</template>

<style scoped></style>
