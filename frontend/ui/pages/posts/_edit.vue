<template>
  <div class="container">
    <div class="post">
      <div class="title">
        <h1>編集</h1>
      </div>
      <div class="post-input">
        <div class="post-title1">
          <label for="">曲名</label>
          <input type="text" v-model="post.title">
        </div>
        <div class="post-artist1">
          <label for="">アーティスト名</label>
          <input type="text" v-model="post.artist">
        </div>
        <div class="post-category1">
          <label for="">カテゴリー</label>
          <select name="categoly" v-model="post.category" >
            <option value="j-pop">j-pop</option>
             <option value="洋楽">洋楽</option>
            <option value="クラシック">クラシック</option>
            <option value="アニメソング">アニメソング</option>
          </select>
        </div>
        <div class="post-comment1">
          <label class="comment-label" for="">コメント</label>
          <textarea v-model="post.body" name="" id="" cols="60" rows="5"></textarea>
        </div>
        <div class="button">
          <button class="btn btn1" @click="backPage">戻る</button>
          <button @click="editArticle" class="btn btn2">編集</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  validate({ store, redirect }) {
    if(!store.state.users.userData.isLogin) {
      redirect('/login');
      return false;
    }
    return true;
  },
  async asyncData({$axios, params, store}) {
    const token = store.state.users.userData.token;
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    const res = await $axios.$get(`/api/posts/${params.edit}`, config);
    const data = await JSON.parse(res);
    if(!data.result) {
      store.commit('errors/setError', data.error);
      return;
    }
    const post = data.post;
    return { post };
  },
  methods: {
    async editArticle() {
      const result = await this.edit({
        title: this.post.title,
        artist: this.post.artist,
        category: this.post.category,
        body: this.post.body,
      });
      if(!result.result) {
        this.$store.commit('errors/setError', result.error);
        return;
      };
      this.$router.push('/posts');
    },
    async edit(editData) {
      const token = this.$store.state.users.userData.token;
      const config = {
        headers: {
          authorization: `Bearer ${token}`
        }
      }
      const res = await this.$axios.$put(`/api/posts/update/${this.$route.params.edit}`, editData, config);
      const result = JSON.parse(res);
      return result;
    },
    backPage() {
      this.$router.go(-1);
    }
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  margin: 0 auto; 
  min-height: 100vh; 
  text-align: center;
}
.post {
  width: 100%;
  margin: 0 auto;
}
/* .post-input {
  text-align: center;  
   width: 100%; 
   margin: 0 auto;
} */
.title {
  width: 50%;
  height: 100px;
  margin: 0 auto;
  margin-top: 30px;
  margin-bottom: 20px;
  color: #474747;
}
.btn1 {
  display: inline;
  height: 50px;
  width: 150px;
  margin: 0 auto;
  line-height: 20px;
  background: #aaefe7;
  color: #474747;
  box-shadow: 0 10px 10px 0 rgb(97, 96, 96);
  border-radius: 25px;
  text-decoration: none;
  text-align: center;
  margin-top: 40px;
  margin-right: 10px;
}

.btn2 {
  display: inline;
  height: 50px;
  width: 150px;
  margin: 0 auto;
  line-height: 20px;
  background: #aaefe7;
  color: #474747;
  box-shadow: 0 10px 10px 0 rgb(97, 96, 96);
  border-radius: 25px;
  text-decoration: none;
  text-align: center;
  margin-top: 40px;
  margin-left: 10px;
}
input {
  width: 250px;
  height: 40px;
  padding: 5px;
  margin-bottom: 20px;
}
.post-title1 {
  width: 70%;
  text-align: right;
}
.post-artist1 {
  width: 70%;
  text-align: right;
}
.post-category1 {
  width: 70%;
  text-align: right;
}
.post-comment1 {
  width: 70%;
  text-align: right;
}
label {
  color: #474747;
  margin-right: 20px;
}
select {
  width: 200px;
  height: 30px;
  margin-bottom: 20px;
  margin-left: 55px;
}
textarea {
  margin: 10px;
  margin-left: 70px;
  padding: 5px;
}
.comment-label {
  margin-right: 330px;
  display: block;
}
.button {
  width: 60%;
}
</style>