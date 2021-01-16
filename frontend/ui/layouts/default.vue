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
                <button class="dropdown-item" @click="switchLoginUser">Logout</button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="error"  v-if="isError">
      <modal name="modal"></modal>
    </div>
    <Nuxt/>
  </div>
</template>
<script>
import ErrorModal from '../components/ErrorModal';
export default {
  components: {ErrorModal},
  methods: {
    switchLoginUser() {
      this.$store.commit('users/logout');
      this.deleteToken();
    },
    deleteToken() {
      localStorage.removeItem('token');
      this.$router.push('/login');
    },
    showError() {
      this.$modal.show(
        ErrorModal,
        {
          errorMessage: this.errorMessage,
          title: 'エラーが発生しました。',
        },
        { height: 100 },
        { 
          'before-close': () => {
            this.$store.commit('errors/releaseError');
          } 
        }
      )
    }
  },
  computed: {
    userName() {
      return this.$store.state.users.user_data.user_name;
    },
    isLoginUser() {
      return this.$store.state.users.user_data.isLogin;
    },
    isError() {
      if(this.$store.state.errors.error_data.isError) {
        this.showError();
      }
      return this.$store.state.errors.error_data.isError;
    },
    errorMessage() {
      return this.$store.state.errors.error_data.message;
    },
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
