<template>
  <div class="container">
    <h1>投稿一覧</h1>
    <div id="post">
      <ul v-for="(post, index) in data.posts" :key="index">
        <li>
          <Post :data="data" :index="index"/>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Post from '../../components/Post';
export default {
  async asyncData({ $axios, store }) {
    let token = localStorage.getItem('token');
    token = JSON.parse(token);
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    let data = await $axios.$get('posts/', config);
    data = JSON.parse(data);
    return { data };
  },
  components: {
    Post,
  },
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