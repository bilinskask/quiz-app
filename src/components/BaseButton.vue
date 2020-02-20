<template>
  <button
    @click="onClick"
  >
    <slot/>
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  methods: {
    onClick (event) {
      if (!this.disabled) {
        this.$emit('click', event)
      }
    }
  }
}
</script>

<style>
button {
  margin: 5px;
}
</style>
