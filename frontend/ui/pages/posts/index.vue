<template>
  <div class="container">
    <h1>投稿一覧</h1>
    <div id="post" >
      <ul>
        <li v-for="(post, index) in data.posts" :key="index" :id="index" >
          <Post :data="data" :index="index" @deletePost="deleteList"/> 
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Post from '../../components/Post';
export default {
  async asyncData({ $axios, redirect, store }) {
    if (process.server) {
      let userInfo = await $axios.$get('/api/users/login/jwt');
      userInfo = await JSON.parse(userInfo);
      if(!userInfo.result) {
        redirect('/login');
      }
      const config = {
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      };
      let data = await $axios.$get('api/posts/', config);
      data = await JSON.parse(data);
      store.commit('users/login',userInfo.userData);
      return { data };
    } else if(process.client) {
      let token = localStorage.getItem('token');
      token = JSON.parse(token);
      const config = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      let data = await $axios.$get('/api/posts/', config);
      data = await JSON.parse(data);
      return { data };
    }
  },
  components: {
    Post,
  },
  methods: {
    deleteList(id) {
      const li = document.getElementById(id);
      li.remove();
    }
  }
};
</script>

<style>
ul {
  list-style: none;
}
h1 {
  margin: 15px;
  text-align: center;
}
</style>