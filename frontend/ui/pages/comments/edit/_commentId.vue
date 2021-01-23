<template>
  <div class="container">
    <div class="comments">
      <div class="title">
        <h1>コメント編集</h1>
      </div>
      <div>
        <label class="comment-label" for="">コメント</label>
        <textarea
          v-model="data.comment.body"
          name=""
          id=""
          cols="60"
          rows="5"
        ></textarea>
      </div>
      <div class="button">
        <button class="btn1 btn" @click="backPage">戻る</button>
        <button class="btn2 btn" @click="edit">編集</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  validate({ store, redirect }) {
    if (!store.state.users.userData.isLogin) {
      redirect("/login");
      return false;
    }
    return true;
  },
  async asyncData({ $axios, store, params }) {
    const config = {
      headers: {
        authorization: `Bearer ${store.state.users.userData.token}`,
      },
    };
    const res = await $axios.$get(
      `/api/comments/edit/${params.commentId}`,
      config
    );
    const data = await JSON.parse(res);
    if (!data.result) {
      store.commit("errors/setError", data.error);
      return;
    }
    return { data };
  },
  methods: {
    async edit() {
      const config = {
        headers: {
          authorization: `Bearer ${this.$store.state.users.userData.token}`,
        },
      };
      const postData = {
        body: this.data.comment.body,
      };
      const res = await this.$axios.$put(
        `/api/comments/update/${this.$route.params.commentId}`,
        postData,
        config
      );
      const data = await JSON.parse(res);
      if (!data.result) {
        this.$store.commit('errors/setError', data.error);
        return;
      };
      this.backPage();
    },
    backPage() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  text-align: center;
}
.comments {
  margin: 0 auto;
  position: relative;
}
.title {
  width: 50%;
  height: 200px;
  position: relative;
  margin: 0 auto;
  color: #474747;
}
h1 {
  margin: 0;
  position: absolute;
  top: 30%;
  left: 30%;
}
.btn2 {
  display: inline;
  height: 50px;
  width: 150px;
  line-height: 20px;
  background: #aaefe7;
  color: #474747;
  border-radius: 25px;
  text-decoration: none;
  text-align: center;
  margin-top: 20px;
  margin-left: 20px;
}
.btn1 {
  display: inline;
  height: 50px;
  width: 150px;
  line-height: 20px;
  background: #aaefe7;
  color: #474747;
  border-radius: 25px;
  text-decoration: none;
  text-align: center;
  margin-top: 20px;
  margin-right: 20px;
}
.button {
  margin: 0 auto;
  margin-top: 30px;
}
.comment-label {
  position: absolute;
  margin-left: 30px;
}
textarea {
  margin-top: 35px;
  margin-left: 20px;
}
</style>