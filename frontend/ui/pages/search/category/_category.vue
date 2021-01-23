<template>
  <div class="container">
    <h2>{{$route.params.category}}で検索した結果</h2>
    <div class="post-non-message" v-if="!data.posts.length ">該当する投稿がありません。</div>
    <div id="category">
      <ul>
        <li v-for="(post, index) in data.posts" :key="index" :id="index" >
          <Post :data="data" :index="index" @deletePost="deleteList"/> 
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Post from '../../../components/Post';
export default {
  validate({ store, redirect }) {
    if(!store.state.users.userData.isLogin) {
      redirect('/login');
      return false;
    }
    return true;
  },
  async asyncData({ $axios, store, params }) {
    const token = store.state.users.userData.token;
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    let data = await $axios.$get(`/api/posts/search/category/${params.category}`, config);
    data = await JSON.parse(data);
    if(!data.result) {
      store.commit('errors/setError', data.error);
      return;
    };
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

<style scoped>
ul {
  list-style: none;
}
h2 {
  margin: 20px;
  margin-top: 20px;
  text-align: center;
}
.post-non-message {
  font-size: 20px;
  margin: 0 auto;  
  margin-top: 100px;
  text-align: center;
}
</style>