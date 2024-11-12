import { test, expect } from 'vitest'
import { render, fireEvent } from '@testing-library/vue'
import { store } from '@/store'
import NewGame from '@/NewGame.vue'

test('first test', async () => {
  const screen = render(NewGame, {
    global: {
      provide: {
        store: store
      }
    }
  })
  const questionInput = screen.getByLabelText('Question:')
  await fireEvent.update(questionInput, 'My question?')

  const button = screen.getByText('Add question')
  await fireEvent.click(button)
  expect(store.state.questions.at(-1)).toEqual({
    answer: '',
    options: [],
    picked: '',
    question: 'My question?'
  })
  expect(window.location.hash).toBe('#/')
})
