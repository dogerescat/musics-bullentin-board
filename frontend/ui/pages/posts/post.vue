<template>
  <div class="container">
    <div class="post">
      <div class="title">
        <h1>投稿</h1>
      </div>
      <div class="post-input">
        <div>
          <label for="">曲名</label>
          <input type="text" v-model="title" />
        </div>
        <div>
          <label for="">アーティスト名</label>
          <input type="text" v-model="artist"/>
        </div>
        <div>
          <label for="">カテゴリー</label>
          <select name="category" id="" v-model="category">
            <option value="j-pop">j-pop</option>
            <option value="洋楽">洋楽</option>
            <option value="クラシック">クラシック</option>
            <option value="アニメソング">アニメソング</option>
            <option value="その他">その他</option>
          </select>
        </div>
        <div>
          <label class="comment-label" for="">コメント</label>
          <textarea name="" id="" cols="60" rows="5" v-model="body"></textarea>
        </div>
        <button class="btn" @click="postArticle" href="#">投稿</button>
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
  data() {
    return {
      title: '',
      artist: '',
      category: 'j-pop',
      body: '',
    }
  },
  methods: {
    async postArticle() {
      if (this.title === '' || this.artist === '' || this.category === '' || this.body === '') {
        return;
      }
      const result = await this.post({
        title: this.title,
        artist: this.artist,
        category: this.category,
        body: this.body,
        user_id: this.$store.state.users.userData.userId 
      });
      if(!result.result) {
        this.$store.commit('errors/setError', result.error);
        return;
      }
      this.$router.push('/posts');
    },
    async post(postData) {
      const token = this.$store.state.users.userData.token;
      const config = {
        headers: {
          authorization: `Bearer ${token}`
        }
      };
      const res = await this.$axios.$post('/api/v1/posts', postData, config);
      const result =  JSON.parse(res);
      return result;
    },
  }
};
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
  height: 100px;
  margin: 0 auto;
  margin-top: 30px;
  margin-bottom: 20px;
  color: #474747;
}
.btn {
  display: block;
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
  margin-right: 20%;
}
input {
  width: 250px;
  height: 40px;
  padding: 5px;
  margin-bottom: 20px;
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
}
</style>