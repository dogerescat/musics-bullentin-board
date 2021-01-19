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
    if(!store.state.users.user_data.isLogin) {
      redirect('/login');
      return false;
    }
    return true;
  },
  data() {
    return {
      title: '',
      artist: '',
      category: '',
      body: '',
    }
  },
  methods: {
    postArticle() {
      if (this.title === '' || this.artist === '' || this.category === '' || this.body === '') {
        return;
      }
      try {
        this.post({
          title: this.title,
          artist: this.artist,
          category: this.category,
          body: this.body,
          user_id: this.$store.state.users.user_data.user_id 
        });
      } catch(error) {
        return;
      } finally {
        this.$router.push('/posts');
      }
    },
    async post(postData) {
      const config = this.getData();
      const res = await this.$axios.$post('/api/posts/create', postData, config);
    },
    getData() {
      let token = localStorage.getItem('token');
      token = JSON.parse(token);
      const config = {
        headers: {
          authorization: `Bearer ${token}`
        }
      }
      return config;
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
.btn {
  display: block;
  height: 50px;
  width: 150px;
  margin: 0 auto;
  line-height: 20px;
  background: #aaefe7;
  color: #474747;
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