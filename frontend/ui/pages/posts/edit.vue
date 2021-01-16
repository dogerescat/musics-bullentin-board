<template>
  <div class="container">
    <div class="post">
      <div class="title">
        <h1>投稿</h1>
      </div>
      <div class="post-input">
        <div>
          <label for="">曲名</label>
          <input type="text">
        </div>
        <div>
          <label for="">アーティスト名</label>
          <input type="text">
        </div>
        <div>
          <label for="">カテゴリー</label>
          <select name="categoly" id="">
              <option value="aaa">aaa</option>
              <option value="bbb">bbb</option>
              <option value="ccc">ccc</option>
          </select>
        </div>
        <div>
          <label class="comment-label" for="">コメント</label>
          <textarea name="" id="" cols="60" rows="5"></textarea>
        </div>
        <button class="btn" href="#">編集</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  validate({store, redirect ,params}) {
    if(store.state.users.user_data.isLogin) {
      return true;
    }
    redirect('login');
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