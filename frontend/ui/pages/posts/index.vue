<template>
  <div class="container">
    <h1>投稿一覧</h1>
    <div id="post">
      <ul v-for="(list, index) in lists" :key="index">
        <li>
          {{ lists[index].title }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, store }) {
    let token = localStorage.getItem("token");
    token = JSON.parse(token);
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    let lists = await $axios.$get("/posts/", config);
    lists = JSON.parse(lists);
    return { lists };
  },
};
</script>

<style>
</style>