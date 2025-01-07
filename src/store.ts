import { createStore, Store } from 'vuex'

export type Question = {
  question: string
  options: string[]
  answer: string
  picked: string | null
  hasRightAnswer?: string
}

export type Questions = Question[]

export const hasRightAnswer = (question: Question) => question.picked === question.answer

export const makeStore = (questions: Questions = []) =>
  createStore({
    state() {
      return {
        questions: questions
      }
    },
    mutations: {
      pick(state, { index, option }) {
        state.questions[index].picked = option
      },
      addQuestion(state, question) {
        state.questions.push(question)
      }
    },
    getters: {
      questions2(state) {
        return state.questions.map((q) => ({ hasRightAnswer: hasRightAnswer(q), ...q }))
      }
    }
  })

const defaultQuestions: Questions = [
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

export const store: Store<{ questions: Questions }> = makeStore(defaultQuestions)
