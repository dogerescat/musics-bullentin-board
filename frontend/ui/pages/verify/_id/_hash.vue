<template>
  <div>
    <h1>{{data.msg}}</h1>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, params, query }) {
    const url = `/api/v1/users/verify/${params.id}/${params.hash}?expires=${query.expires}&signature=${query.signature}`;
    let data = await $axios.$get(url);
    data = JSON.parse(data);
    return { data };
  },
  async mounted() {
    if(this.data.msg) {
      let res = await this.$axios.$get(`http://localhost:3000/server/signup/${this.$route.params.id}`);
      res = JSON.parse(res);
      if(res.result) {
        location.href = 'http://localhost:3000/posts';
      }
    }
  }
}
</script>

<style scoped>
h1 {
  margin: 50px;
  text-align: center;
}
</style>