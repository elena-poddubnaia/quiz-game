import { test, expect } from 'vitest'
import { render, fireEvent, getByText, type RenderResult } from '@testing-library/vue'
import { makeStore, type Questions } from './store'
import NewGame from './NewGame.vue'
import PlayGame from './PlayGame.vue'
import type { Store } from 'vuex'

test('NewGame', async () => {
  const page = new NewGamePage()
  await page.addQuestion('My question?')
  page.expectOptionsOnScreen([])

  await page.addOption('first')
  await page.addOption('second')
  page.expectOptionsOnScreen(['first', 'second'])

  await page.addCorrectAnswer('first')

  await page.clickAddQuestion()

  expect(page.lastQuestion()).toEqual({
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
  await page.addOption('second')
  page.expectOptionsOnScreen(['first', 'second'])

  await page.removeOption('second')
  page.expectOptionsOnScreen(['first'])
})

test('PlayGame', async () => {
  const correctAnswer = 'yes'
  const page = new PlayGamePage(correctAnswer)

  await page.selectAnswer(correctAnswer)
  await page.submitAnswers()
  page.expectAnswerIsCorrect()
})

async function clickAddOption(screen: RenderResult) {
  await fireEvent.click(screen.getByText('Add option'))
}

function expectOptionFieldToBeClear(screen: RenderResult) {
  const optionsInput: any = screen.getByLabelText('Options:')
  expect(optionsInput.value).toEqual('')
}

class NewGamePage {
  screen: RenderResult
  store: Store<{ questions: Questions }>
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

  async addQuestion(quesstion: string) {
    const questionInput = this.screen.getByLabelText('Question:')
    await fireEvent.update(questionInput, quesstion)
  }

  expectOptionsOnScreen(expectedOptions: string[]) {
    const optionLabels = this.screen.queryAllByTestId(/^option-label-/)
    expect(optionLabels.map((o) => o.textContent)).toEqual(expectedOptions)
  }

  async addOption(option: string) {
    const optionsInput = this.screen.getByLabelText('Options:')
    await fireEvent.update(optionsInput, option)
    await clickAddOption(this.screen)
    expectOptionFieldToBeClear(this.screen)
  }

  async removeOption(option: string) {
    const optionElement = this.screen.getByTestId('option-' + option)
    const button = getByText(optionElement, 'X')
    await fireEvent.click(button)
  }

  async addCorrectAnswer(answer: string) {
    const answerInput = this.screen.getByLabelText(answer)
    await fireEvent.click(answerInput)
  }

  async clickAddQuestion() {
    const button = this.screen.getByText('Add question')
    await fireEvent.click(button)
  }

  lastQuestion() {
    return this.store.state.questions.at(-1)
  }

  expectRedirectedToHomePage() {
    expect(window.location.hash).toBe('#/')
  }
}

class PlayGamePage {
  screen: RenderResult
  store: Store<{ questions: Questions }>
  constructor(correctAnswer: string) {
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
    const submitButton: any = this.screen.getByText('Submit')
    expect(submitButton).toBeEnabled()

    await fireEvent.click(submitButton)
  }

  async selectAnswer(answer: string) {
    const question = this.screen.getByLabelText(answer)
    await fireEvent.click(question)
  }
}
