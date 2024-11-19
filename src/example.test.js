import { test, expect } from 'vitest'
import { render, fireEvent } from '@testing-library/vue'
import { makeStore } from '@/store'
import NewGame from '@/NewGame.vue'
import PlayGame from './PlayGame.vue'

test('NewGame', async () => {
  const store = makeStore()
  const screen = render(NewGame, {
    global: {
      provide: {
        store: store
      }
    }
  })
  const questionInput = screen.getByLabelText('Question:')
  await fireEvent.update(questionInput, 'My question?')

  const optionsInput = screen.getByLabelText('Options:')
  await fireEvent.update(optionsInput, 'first')
  const addOptionButton = screen.getByText('Add option')
  await fireEvent.click(addOptionButton)

  await fireEvent.update(optionsInput, 'second')
  await fireEvent.click(addOptionButton)

  const answerInput = screen.getByLabelText('Answer:')
  await fireEvent.update(answerInput, 'first')

  const button = screen.getByText('Add question')
  await fireEvent.click(button)

  expect(store.state.questions.at(-1)).toEqual({
    answer: 'first',
    options: ['first', 'second'],
    picked: '',
    question: 'My question?'
  })
  expect(window.location.hash).toBe('#/')
})

test('PlayGame', async () => {
  const store = makeStore([
    {
      question: 'Is it first question?',
      options: ['yes', 'no'],
      answer: 'yes',
      picked: ''
    }
  ])
  const screen = render(PlayGame, {
    global: {
      provide: {
        store: store
      }
    }
  })
  const question = screen.getByLabelText('yes')
  await fireEvent.click(question)

  const submitButton = screen.getByText('Submit')
  expect(submitButton).toBeEnabled()

  await fireEvent.click(submitButton)

  const rightAnswers = screen.getAllByText('correct')
  expect(rightAnswers.length).toEqual(1)
})
