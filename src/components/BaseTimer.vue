<template>
  <div  >
    {{initialTimer}}
  </div>
</template>

<script>
export default {
  name: 'BaseTimer',
  data () {
    return {
      initialTimer: 10,
      interval: null
    }
  },
  created () {
    this.countdown()
  },
  methods: {
    countdown () {
      this.interval = setInterval(() => this.setTimer(), 1000)
    },
    setTimer () {
      if (this.initialTimer !== 0) {
        this.initialTimer--
      } else {
        this.$emit('timerCounter', this.initialTimer)
        this.initialTimer = 10
      }
    },
    reset () {
      this.initialTimer = 10
    }
  }
}
</script>
