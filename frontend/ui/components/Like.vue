<template>
  <div class="icon-container">
      <font-awesome-icon :icon="['fas','heart']" @click="offLike" style="color: #FF97C2;"></font-awesome-icon>
  </div>
</template>
<script>
export default {
  methods: {
    offLike() {
      this.$emit('offLike');
    }
  }
}
</script>
<style>
.icon-container {
  display: inline;
  margin-left: 5px;
}
.icon {
  font-size: 18px;
}
</style>