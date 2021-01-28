<template>
  <div>
    <h1>コメント一覧</h1>
    <div id="comment-container" >
      <ul>
        <li v-for="(comment, index) in data.comments" :key="index" :id="index" >
          <Comment :data="data" :index="index" @deleteComment="deleteList" /> 
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Comment from '../../components/Comment';
export default {
  validate({ store, redirect }) {
    if(!store.state.users.userData.isLogin) {
      redirect('/login');
    }
    return true;
  },
  components: { Comment },
  async asyncData({ $axios, params, store }) {
    const token = store.state.users.userData.token;
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    let data = await $axios.$get(`api/v1/comments/${params.postId}`, config);
    data = await JSON.parse(data);
    if(!data.result) {
      store.commit('errors/setError', data.error);
      return;
    }
    return { data };
  },
  methods: {
    deleteList(index) {
      const li = document.getElementById(index);
      li.remove();
    }
  }
}
</script>

<style>
ul {
  padding: 30px;
}
</style>