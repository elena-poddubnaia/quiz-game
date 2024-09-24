<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
store.commit('logState')

// const questions = ref([
//   {
//     question: 'Is it first question?',
//     options: ['yes', 'no'],
//     answer: 'yes',
//     picked: ''
//   },
//   {
//     question: 'Is it second question?',
//     options: ['yes', 'no'],
//     answer: 'yes',
//     picked: ''
//   },
//   {
//     question: 'Is it second question?',
//     options: ['yes', 'no', 'maybe', "don't want to answer"],
//     answer: 'yes',
//     picked: ''
//   }
// ])

const showResults = ref(false)

function onSubmit() {
  showResults.value = true
}

const questions = computed(() => store.state.questions)
// mapState(['questions'])
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
          @change="() => store.commit('pick')"
        />
        <label>{{ option }}</label>
      </div>

      {{
        question.picked === '' || !showResults
          ? ''
          : question.picked === question.answer
            ? 'correct'
            : 'wrong'
      }}

      <br />
    </div>

    <button @click="onSubmit" :disabled="questions.filter((i) => i.picked === '').length != 0">
      Submit
    </button>
  </main>
</template>

<style scoped></style>
