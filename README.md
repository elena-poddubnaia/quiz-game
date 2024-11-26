## Development Plan
We want to break the development into three steps: Vue.js, TypeScript, and unit tests. Consider adding the database later in the process.

## Quiz-game TODO checklist

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
- [ ] HW: extract test step to higher level, name function as what it means to user, navigate through the test, read Page Object
- [ ] Add possability to remove option
- [ ] Enable selecting one option as correct answer
- [ ] Implement form validation(fields are full field)
- [ ] Enjoy



Goals for Braves:
- [ ] TypeScript
- [ ] Connect New Game Page with Play Game
- [ ] Database query and API calls 

## Tips 
After adding new code, first think about what you expect to happen. Then, open the browser and check if everything works as you expected (or not).

Read documentation.

Notice and optimize repeated tasks (commits, testing).

When starting with unknown topic, break it down into tasks we need to figure out.

## Reading list
- [ ] [Page Object](https://martinfowler.com/bliki/PageObject.html) 

