<template>
  <div>
    <h3>{{ title }}</h3>
    <p>{{ errorMessage }}</p>
  </div>
</template>

<script>
export default {
  name: 'ErrorModal',
  props: {
    errorMessage: {
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