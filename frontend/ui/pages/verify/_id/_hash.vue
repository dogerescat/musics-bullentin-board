<template>
  <div>
    <h1>{{data.msg}}</h1>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, params, query }) {
    const url = `/api/users/verify/${params.id}/${params.hash}?expires=${query.expires}&signature=${query.signature}`;
    let data = await $axios.$get(url);
    data = JSON.parse(data);
    return { data };
  }
}
</script>

<style scoped>
h1 {
  margin: 50px;
  text-align: center;
}
</style>