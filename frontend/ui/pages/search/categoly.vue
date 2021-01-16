<template>
  <div class="container">
    <div class="search">
      <div class="title">
        <h1>検索</h1>
      </div>
      <div class="select">
        <label for="">
          <h3>カテゴリー</h3>
        </label>
        <select name="" id="">
          <option value="">aaa</option>
          <option value="">bbb</option>
          <option value="">ccc</option>
        </select>
      </div>
      <div class="button">
        <button class="btn">検索</button>
      </div>
      <div class="other">
        <NuxtLink to="/search/artist"> アーティスト名で検索 </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  validate({ store, redirect }) {
    if (store.state.users.user_data.isLogin) {
      return true;
    }
    redirect('/login');
  },
};
</script>

<style scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  text-align: center;
}

.search {
  margin: 0 auto;
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
  display: inline;
  height: 40px;
  width: 90px;
  margin: 0 auto;
  line-height: 20px;
  background: #aaefe7;
  color: #474747;
  border-radius: 25px;
  text-decoration: none;
  text-align: center;
  margin-left: 10px;
}
label {
  color: #474747;
  margin-right: 20px;
}
select {
  width: 250px;
  height: 40px;
  margin-bottom: 20px;
  margin-left: 55px;
}
.other {
  margin-top: 50px;
}
.button {
  display: inline;
}
.select {
  display: inline;
}
</style>