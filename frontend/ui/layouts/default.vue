<template>
  <div>
    <nav class="navbar navbar-expand-md">
      <div class="container">
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item" v-if="!isLoginUser">
              <NuxtLink class="nav-link" to="/">新規登録</NuxtLink>
            </li>
            <li class="nav-item" v-if="!isLoginUser">
              <NuxtLink class="nav-link" to="/login">ログイン</NuxtLink>
            </li>
            <li class="nav-item" v-if="isLoginUser">
              <NuxtLink class="nav-link" to="/posts">投稿一覧</NuxtLink>
            </li>
            <li class="nav-item" v-if="isLoginUser">
              <NuxtLink class="nav-link" to="/posts/post">投稿</NuxtLink>
            </li>
            <li class="nav-item" v-if="isLoginUser">
              <NuxtLink class="nav-link" to="/search/">検索</NuxtLink>
            </li>
            <li class="nav-item dropdown" v-if="isLoginUser">
              <NuxtLink
                class="btn dropdown-toggle"
                to="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {{userName}}
              </NuxtLink>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <NuxtLink class="dropdown-item" to="/login" @click="switchLoginUser">Logout</NuxtLink>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <Nuxt/>
  </div>
</template>
<script>
export default {
  methods: {
    switchLoginUser() {
      this.$store.commit('users/logout');
    },
  },
  computed: {
    userName() {
      return this.$store.state.users.user_data.user_name;
    },
    userId() {
      return this.$store.state.users.user_data.user_id;
    },
    isLoginUser() {
      return this.$store.state.users.user_data.isLogin;
    }
  }
};
</script>
<style scoped>
.navbar {
  background-color: #aaefe7;
  height: 50px;
  padding: 0;
}
li > .nav-link {
  color: #474747;
}
.btn {
  color: #474747;
}
</style>
