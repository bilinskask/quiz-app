<template>
  <div id="app">
    <!-- <span v-if="isRequesting">Loading...</span> -->
    <BaseSpinner
      v-if="isRequesting"
    >
    Loading...
    </BaseSpinner>
    <template v-if='!gameStarted && !isRequesting'>
      <h1 class="is-size-2">Show your knowledge</h1>
      <BaseButton
        class='button is-info'
        @click="changeGameState"
        >
        Start Playing
    </BaseButton>
    </template>
    <BaseCard v-if='currentQuestion && !isRequesting && gameStarted'>
      <BaseTimer
        ref="resetTimer"
        @timerCounter="checkTimer"
      >
      </BaseTimer>
      <h2
      class="is-size-4"
      >{{currentQuestion.question}}</h2>
      <h3
      class="is-size-5"
      >
        {{currentQuestion.category}}
      </h3>
      <ul>
        <li v-for="answer in currentAnswers" :key="answer">
          <BaseButton
            class="button is-info"
            @click="submitAnswer(answer)"
            >
            {{answer}}
          </BaseButton>
        </li>
      </ul>
    </BaseCard>
    <template v-if="currentIndex === 10 && !isRequesting">
      <h2>
        Your score is: {{score}} points!
      </h2>
      <BaseButton
        class="button is-info"
        @click="fetchQuestions"
      >
        Play Again
      </BaseButton>
    </template>
  </div>
</template>

<script>
// import axios from '@/packages/axios'
import BaseButton from '@/components/BaseButton'
import BaseTimer from '@/components/BaseTimer'
import BaseCard from '@/components/BaseCard'
import BaseSpinner from '@/components/BaseSpinner'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'App',
  components: {
    BaseButton,
    BaseTimer,
    BaseCard,
    BaseSpinner
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      isRequesting: 'isRequesting',
      currentIndex: 'currentIndex',
      questions: 'questions',
      gameStarted: 'gameStarted',
      score: 'score',
      currentQuestion: 'currentQuestion',
      currentAnswers: 'currentAnswers'
    })
  },
  created () {
    this.fetchQuestions()
  },
  methods: {
    ...mapActions({
      changeGameState: 'changeGameState',
      fetchQuestions: 'fetchQuestions',
      submitAnswer: 'submitAnswer',
      checkTimer: 'checkTimer'
    })
  }
}
</script>

<style lang='scss'>
body {
  height: 100vh;
  background-image: url("../assets/images/background.jpg");
  display: grid;
  text-align: center;
  justify-content: center;
  justify-items: center;
  align-items: center;
}

</style>
