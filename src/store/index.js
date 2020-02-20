import axios from '@/packages/axios'
import shuffle from 'lodash.shuffle'

export default {
  strict: process.env.NODE_ENV === 'developement',
  state: () => ({
    isRequesting: false,
    currentIndex: 0,
    questions: [],
    gameStarted: false,
    score: 0
  }),
  getters: {
    isRequesting: state => state.isRequesting,
    currentIndex: state => state.currentIndex,
    questions: state => state.questions,
    gameStarted: state => state.gameStarted,
    score: state => state.score,
    currentQuestion: state => {
      if (state.questions.length) {
        return state.questions[state.currentIndex]
      } else {
        return null
      }
    },
    currentAnswers (_, getters) {
      const currentQuestion = getters.currentQuestion
      if (currentQuestion) {
        const answers = [
          ...currentQuestion.incorrect_answers,
          currentQuestion.correct_answer
        ]
        return shuffle(answers)
      }
      return []
    }
  },
  mutations: {
    setGameState (state, payload) {
      state.gameStarted = payload
    },
    setFetchingState (state, payload) {
      state.isRequesting = payload
    },
    setQuestions (state, payload) {
      state.questions = payload
    },
    setCurrentScore (state, payload) {
      state.score = payload
    },
    setCurrentIndex (state, payload) {
      state.currentIndex = payload
    }
  },
  actions: {
    changeGameState ({ commit }) {
      commit('setGameState', true)
    },
    async fetchQuestions ({ state, commit }) {
      commit('setFetchingState', true)
      try {
        const { data } = await axios.get('/api.php?amount=10')
        commit('setQuestions', data.results)
        commit('setFetchingState', false)
        commit('setCurrentIndex', 0)
        commit('setCurrentScore', 0)
      } catch {
        commit('setFetchingState', false)
      }
    },
    submitAnswer ({ state, commit }, answer) {
      this.$refs.resetTimer.reset()
      if (answer === state.questions[state.currentIndex].correct_answer) {
        commit('setCurrentScore', state.score + 1)
      }
      commit('setCurrentIndex', state.currentIndex + 1)
    },
    checkTimer ({ state, commit }) {
      commit('setCurrentIndex', state.currentIndex + 1)
    }
  }
}
