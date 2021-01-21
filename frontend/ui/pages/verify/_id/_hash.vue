<template>
  <div>
    <h1>{{data.msg}}</h1>
    <button class="button btn" @click="login">ログインする</button>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, params, query }) {
    const url = `/api/users/verify/${params.id}/${params.hash}?expires=${query.expires}&signature=${query.signature}`;
    let data = await $axios.$get(url);
    data = JSON.parse(data);
    return { data };
  },
  methods: {
    login() {
    try {
        this.saveToken(this.data);
      } catch(error) {
        return;
      }
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

<style scoped>
h1 {
  margin: 50px;
  text-align: center;
}
.button {
  display: block;
  height: 50px;
  width: 150px;
  margin: 0 auto;
  line-height: 20px;
  background: #aaefe7;
  color: #474747;
  border-radius: 25px;
  text-decoration: none;
  text-align: center;
  margin-top: 40px;
}
</style>