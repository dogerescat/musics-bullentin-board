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
  validate({ store, redirect }) {
    if(!store.state.users.userData.isLogin) {
      redirect('/login');
      return false;
    }
    return true;
  },
  async asyncData({ $axios, store }) {
    const token = store.state.users.userData.token;
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    let data = await $axios.$get('api/v1/posts/', config);
    data = await JSON.parse(data);
    if(!data.result) {
      store.commit('errors/setError', data.error);
    }
    return { data };
  },
  components: {
    Post,
  },
  methods: {
    deleteList(id) {
      const li = document.getElementById(id);
      li.remove();
    },
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