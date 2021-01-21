<template>
  <div class="icon-container">
      <font-awesome-icon :icon="['far','comment']" @click="goCommentPage"></font-awesome-icon> 
  </div>
</template>
<script>
export default {
  name: 'CommentIcon',
  methods: {
    goCommentPage() {
      this.$emit('goCommentPage');
    }
  }
}
</script>
<style>
.icon-container {
    display: inline;
    margin-right: 5px;
}
</style>