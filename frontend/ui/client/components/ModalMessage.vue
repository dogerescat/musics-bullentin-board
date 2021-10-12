<template>
  <div>
    <h3>{{title}}</h3>
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  name: 'ErrorModal',
  props: {
    message: {
      type: String,
    },
    title: {
      type: String,
    },
  },
};
</script>
<style>
</style>