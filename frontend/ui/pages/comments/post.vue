<template>
  <div class="container">
    <div class="comments">
      <div class="title">
        <h1>コメント投稿</h1>
      </div>
      　
      <div>
        <label class="comment-label" for="">コメント</label>
        <textarea name="" id="" cols="60" rows="5"></textarea>
        　
      </div>
      <div class="button">
        <button class="btn1" href="#">戻る</button>
        <button class="btn2" href="#">コメント</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  validate({ store, redirect }) {
    if(!store.state.users.user_data.isLogin) {
      redirect('/login');
    }
    return true;
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
  margin-top: 30px;
  margin-left: 30px;
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