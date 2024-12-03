import { test, expect } from 'vitest'
import { render, fireEvent } from '@testing-library/vue'
import { makeStore } from '@/store'
import NewGame from '@/NewGame.vue'
import PlayGame from './PlayGame.vue'

test('NewGame', async () => {
  const page = new NewGamePage()

  await page.addQuestion('My question?')
  page.expectOptionsOnScreen([])

  await addOption(page.screen, 'first') //call objects method

  await addOption(page.screen, 'second')

  page.expectOptionsOnScreen(['first', 'second'])

  await addCorrectAnswer(page.screen, 'first')

  await clickAddQuestion(page.screen)

  expect(lastQuestion(page.store)).toEqual({
    answer: 'first',
    options: ['first', 'second'],
    picked: '',
    question: 'My question?'
  })

  expectRedirectedToHomePage()
})

test('PlayGame', async () => {
  const correctAnswer = 'yes'
  const store = makeStore([
    {
      question: 'Is it first question?',
      options: ['yes', 'no'],
      answer: correctAnswer,
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
  await selectAnswer(screen, correctAnswer)

  await submitAnswers(screen)

  expectAnswerIsCorrect(screen)
})

function expectAnswerIsCorrect(screen) {
  const rightAnswers = screen.getAllByText('correct')
  expect(rightAnswers.length).toEqual(1)
}

async function submitAnswers(screen) {
  const submitButton = screen.getByText('Submit')
  expect(submitButton).toBeEnabled()

  await fireEvent.click(submitButton)
}

async function selectAnswer(screen, answer) {
  const question = screen.getByLabelText(answer)
  await fireEvent.click(question)
}

function expectRedirectedToHomePage() {
  expect(window.location.hash).toBe('#/')
}

function lastQuestion(store) {
  return store.state.questions.at(-1)
}

async function clickAddQuestion(screen) {
  const button = screen.getByText('Add question')
  await fireEvent.click(button)
}

async function addCorrectAnswer(screen, answer) {
  const answerInput = screen.getByLabelText(answer)
  await fireEvent.click(answerInput)
}

async function addOption(screen, option) {
  const optionsInput = screen.getByLabelText('Options:')
  await fireEvent.update(optionsInput, option)
  await clickAddOption(screen)
  expectOptionFieldToBeClear(screen)
}

async function clickAddOption(screen) {
  await fireEvent.click(screen.getByText('Add option'))
}

function expectOptionFieldToBeClear(screen) {
  const optionsInput = screen.getByLabelText('Options:')
  expect(optionsInput.value).toEqual('')
}

class NewGamePage {
  constructor() {
    this.store = makeStore()
    this.screen = render(NewGame, {
      global: {
        provide: {
          store: this.store
        }
      }
    })
  }

  async addQuestion(quesstion) {
    const questionInput = this.screen.getByLabelText('Question:')
    await fireEvent.update(questionInput, quesstion)
  }

  expectOptionsOnScreen(expectedOptions) {
    const options = this.screen.queryAllByTestId('option')
    expect(options.map((o) => o.textContent)).toEqual(expectedOptions)
  }
}
