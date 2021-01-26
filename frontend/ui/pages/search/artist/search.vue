<template>
  <div class="container">
    <div class="search">
      <div class="title">
        <h1>アーティスト検索</h1>
      </div>
      <div class="select">
        <label for="">
          <h3>アーティスト名</h3>
        </label>
        <input type="text" v-model="artist">
      </div>
      <div class="button">
        <button class="btn" @click="search">検索</button>
      </div>
      <div class="other">
        <NuxtLink class="category-link" to="/search/category/search"> カテゴリーで検索 </NuxtLink>
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
      artist: ''
    };
  },
  methods: {
    search() {
      if(this.artist === '') {
        return;
      }
      this.$router.push(`/search/artist/${this.artist}`);
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
.category-link {
  font-size: 25px;
}
input {
  padding: 5px;
  width: 300px;
  height: 40px;
}
</style>