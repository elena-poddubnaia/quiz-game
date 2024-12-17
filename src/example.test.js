import { test, expect } from 'vitest'
import { render, fireEvent } from '@testing-library/vue'
import { makeStore } from '@/store'
import NewGame from '@/NewGame.vue'
import PlayGame from './PlayGame.vue'

test('NewGame', async () => {
  const page = new NewGamePage()
  await page.addQuestion('My question?')
  page.expectOptionsOnScreen([])

  await page.addOption('first')
  await page.addOption('second')
  page.expectOptionsOnScreen(['first', 'second'])

  await page.addCorrectAnswer('first')

  await page.clickAddQuestion()

  expect(page.lastQuestion(page.store)).toEqual({
    answer: 'first',
    options: ['first', 'second'],
    picked: '',
    question: 'My question?'
  })

  page.expectRedirectedToHomePage()
})

test('NewGame remove option', async () => {
  const page = new NewGamePage()
  page.expectOptionsOnScreen([])

  await page.addOption('first')
  page.expectOptionsOnScreen(['first'])

  await page.removeOption('first')
  page.expectOptionsOnScreen([])
})

test('PlayGame', async () => {
  const correctAnswer = 'yes'
  const page = new PlayGamePage(correctAnswer)

  await page.selectAnswer(correctAnswer)
  await page.submitAnswers()
  page.expectAnswerIsCorrect()
})

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

  async addOption(option) {
    const optionsInput = this.screen.getByLabelText('Options:')
    await fireEvent.update(optionsInput, option)
    await clickAddOption(this.screen)
    expectOptionFieldToBeClear(this.screen)
  }

  async removeOption(option) {
    const optionElement = this.screen.getByTestId('option')
    const button = optionElement.querySelector('button')
    await fireEvent.click(button)
  }

  async addCorrectAnswer(answer) {
    const answerInput = this.screen.getByLabelText(answer)
    await fireEvent.click(answerInput)
  }

  async clickAddQuestion() {
    const button = this.screen.getByText('Add question')
    await fireEvent.click(button)
  }

  lastQuestion(store) {
    return store.state.questions.at(-1)
  }

  expectRedirectedToHomePage() {
    expect(window.location.hash).toBe('#/')
  }
}

class PlayGamePage {
  constructor(correctAnswer) {
    this.store = makeStore([
      {
        question: 'Is it first question?',
        options: ['yes', 'no'],
        answer: correctAnswer,
        picked: ''
      }
    ])
    this.screen = render(PlayGame, {
      global: {
        provide: {
          store: this.store
        }
      }
    })
  }

  expectAnswerIsCorrect() {
    const rightAnswers = this.screen.getAllByText('correct')
    expect(rightAnswers.length).toEqual(1)
  }

  async submitAnswers() {
    const submitButton = this.screen.getByText('Submit')
    expect(submitButton).toBeEnabled()

    await fireEvent.click(submitButton)
  }

  async selectAnswer(answer) {
    const question = this.screen.getByLabelText(answer)
    await fireEvent.click(question)
  }
}
