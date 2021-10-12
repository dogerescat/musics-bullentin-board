<template>
  <div class="container">
    <div class="search">
      <div class="title">
        <h1>カテゴリー検索</h1>
      </div>
      <div class="select">
        <label for="">
          <h3>カテゴリー</h3>
        </label>
        <select name="category" id="" v-model="category">
            <option value="j-pop">j-pop</option>
            <option value="洋楽">洋楽</option>
            <option value="クラシック">クラシック</option>
            <option value="アニメソング">アニメソング</option>
            <option value="その他">その他</option>
          </select>
      </div>
      <div class="button">
        <button class="btn" @click="search">検索</button>
      </div>
      <div class="other">
        <NuxtLink class="artist-link" to="/search/artist/search"> アーティスト名で検索 </NuxtLink>
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
      category: 'j-pop'
    }
  },
  methods: {
    search() {
      this.$router.push(`/search/category/${this.category}`); 
    }
  }
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
  box-shadow: 0 5px 5px 0 rgb(97, 96, 96);
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
.artist-link {
  font-size: 25px;
}
</style>