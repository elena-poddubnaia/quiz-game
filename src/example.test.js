import { test, expect } from 'vitest'
import { render } from '@testing-library/vue'
import NewGame from '@/NewGame.vue'

test('first test', () => {
  render(NewGame)
  expect(true).toBe(true)
})
