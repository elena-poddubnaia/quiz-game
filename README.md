## Development Plan
We want to break the development into three steps: Vue.js with Vuex as stage management, TypeScript, and unit tests with Vitest. Consider adding the database later in the process.

Main topics: incremental development, TDD, state management, page object, routing. 

## Quiz-game TODO checklist
#### 2024
- [x] Set up the Vue.js project and run it locally.
- [x] Build the simplest version with one question and two answer options. When an answer is selected, the user should be informed whether it is correct or wrong.
- [x] Make the picked binding work as new.
- [x] Add dynamic questions
- [x] Consider to add state management with vuex
- [x] Make vuex work: remove binding for options, use mutation instead 
- [x] Learn about routing and how we can use it
- [x] Discuss hasRightAnswer function implementation
- [x] Add test
- [x] Use Vitest for component testing
- [x] Add to makeStore() function input parameter with default value to create empty store, or prepopulated store

New Game page:
- [x] Try test first approach
- [x] Show options as they are added (on Add option button click, like list of tags)
- [x] Clear input field after adding an option
- [x] Extract test step to higher level, name function as what it means to user, navigate through the test, read Page Object
- [x] Select one option as correct answer
- [x] Enjoy
- [x] Create page object for Play Game page
- [x] Add possability to remove option ( with TDD from now on for all future features)

#### 2025
- [ ] HW check good practice from twill tests (what ppl use instead findByTestId)
- [ ] HW TypeScript
- [ ] Implement form validation (check that fields are full field)
- [ ] Connect New Game Page with Play Game

Goals for Braves:
- [ ] Database query and API calls

Ideas to discuss:
- Let's change vuex to pinia just for fun and comparison. 
- I found [design](https://www.figma.com/design/E9S5iPcm10f0RIHK8mCqKL/Quizzical-App?node-id=0-1&p=f&t=NbwqqvPdQcubO1K7-0) that looks fancy, let's take it and make our UI pretty.
- Score count.


## Tips 
- After adding new code, first think about what you expect to happen. Then, open the browser and check if everything works as you expected (or not). Same with test run.

- Read documentation.

- Optimize repeated tasks (commits, testing).

- When starting with unknown topic, break it down into tasks we need to figure out.

- To test a remove option functionality (or any remove function), start with an array with several items. Call the remove function, then check that the item is deleted, the other items are still there, and the whole list was not deleted.

## Reading list
- [ ] [Page Object](https://martinfowler.com/bliki/PageObject.html) 

