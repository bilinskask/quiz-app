<template>
  <div class="card">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'BaseCard'
}
</script>

<style lang='scss' scoped>
.card {
  display: grid;
  grid-template-rows: 50px 150px 50px 1fr;
  align-content: space-between;
  background-color: white;
  margin: 5px;
  width: 350px;
  height: 450px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
}

button {
  width: 300px;
  margin: 5px;
}
</style>
