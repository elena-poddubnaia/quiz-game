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
    logState() {
      console.log(this.state)
    },
    pick(state) {
      console.log(state)
      state.questions = []
    }
  }
})
