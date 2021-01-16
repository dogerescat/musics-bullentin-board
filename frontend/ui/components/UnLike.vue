<template>
  <div class="icon-container">
      <font-awesome-icon :icon="['far','heart']" @click="onLike"></font-awesome-icon>
  </div>
</template>
<script>
export default {
  methods: {
    onLike() {
      this.$emit('onLike')
    }
  }
}
</script>
<style>
.icon-container {
    display: inline;
    margin-left: 5px;
}
</style>
