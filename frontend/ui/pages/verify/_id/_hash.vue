<template>
  <div>
    <h1>{{data.msg}}</h1>
    <button @click="login">ログインする</button>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, params, query }) {
    const url = `users/verify/${params.id}/${params.hash}?expires=${query.expires}&signature=${query.signature}`;
    let data = await $axios.$get(url);
    data = JSON.parse(data);
    return { data };
  },
  methods: {
    login() {
      this.saveToken(this.data);
      this.$store.commit('users/login', this.data);
      this.$router.push('/posts');
    },
    saveToken(data) {
      const token = JSON.stringify(data.token);
      localStorage.setItem('token', token);
    },
  },
};
</script>

<style>
</style>