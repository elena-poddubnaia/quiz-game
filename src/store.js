import { createStore } from 'vuex'

export const store = createStore({
  state() {
    return {
      questions: [
        {
          question: 'Is it first question?',
          options: ['yes', 'no'],
          answer: 'yes',
          picked: ''
        },
        {
          question: 'Is it second question?',
          options: ['yes', 'no'],
          answer: 'yes',
          picked: ''
        },
        {
          question: 'Is it second question?',
          options: ['yes', 'no', 'maybe', "don't want to answer"],
          answer: 'yes',
          picked: ''
        }
      ]
    }
  },
  mutations: {
    pick(state, { index, option }) {
      state.questions[index].picked = option
    }
  }
})
