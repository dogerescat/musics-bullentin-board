<template>
  <div class="container">
    <div class="post">
      <div class="title">
        <h1>投稿</h1>
      </div>
      <div class="post-input">
        <div>
          <label for="">曲名</label>
          <input type="text" v-model="post.title">
        </div>
        <div>
          <label for="">アーティスト名</label>
          <input type="text" v-model="post.artist">
        </div>
        <div>
          <label for="">カテゴリー</label>
          <select name="categoly" v-model="post.category" >
            <option value="j-pop">j-pop</option>
             <option value="洋楽">洋楽</option>
            <option value="クラシック">クラシック</option>
            <option value="アニメソング">アニメソング</option>
          </select>
        </div>
        <div>
          <label class="comment-label" for="">コメント</label>
          <textarea v-model="post.body" name="" id="" cols="60" rows="5"></textarea>
        </div>
        <div class="button">
          <button class="btn" @click="backPage">戻る</button>
          <button @click="editArticle" class="btn" href="#">編集</button>
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
  async asyncData({$axios, params}) {
    let token = localStorage.getItem('token');
    token = JSON.parse(token);
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    let post = await $axios.$get(`/api/posts/${params.edit}`, config);
    post = await JSON.parse(post);
    return { post };
  },
  methods: {
    editArticle() {
      try {
        this.edit({
          title: this.post.title,
          artist: this.post.artist,
          category: this.post.category,
          body: this.post.body,
        });
      } catch(error) {
        return;
      } finally {
        this.$router.push('/posts');
      }
    },
    async edit(editData) {
      const config = this.getToken();
      const data = await this.$axios.$put(`/api/posts/update/${this.$route.params.edit}`, editData, config);
    },
    getToken() {
      let token = localStorage.getItem('token');
      token = JSON.parse(token);
      const config = {
        headers: {
          authorization: `Bearer ${token}`
        }
      }
      return config;
    },
    backPage() {
      this.$router.go(-1);
    }
  }
}
</script>

<style scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  text-align: center;
}
.post {
  margin: 0 auto;
}
.post-input {
  text-align: right;
  margin: 0 auto;
  
  margin-right: 30%;
}
.title {
  width: 50%;
  height: 200px;
  position: relative;
  margin: 0 auto;
  color:#474747;
}
h1 {
  margin: 0;
  position: absolute;
  top: 30%;
  left: 30%;
}
.btn{
  display:block;
  height: 50px;
  width: 150px;
  margin: 0 auto;
  line-height:20px;
  background: #AAEFE7;
  color:#474747;
  border-radius:25px;
  text-decoration:none;
  text-align:center;
  margin-top: 40px;
  margin-right: 20%;
}
input {
  width: 250px;
  height: 40px;
  padding: 5px;
  margin-bottom: 20px;
}
label {
  color:#474747;
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
}
</style>