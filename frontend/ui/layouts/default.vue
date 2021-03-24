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
        <span id="title">musics board</span>
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
              <NuxtLink class="nav-link" to="/search/category/search">検索</NuxtLink>
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
              <div class="dropdown-menu logout" aria-labelledby="navbarDropdown">
                <button class="dropdown-item" @click="logout">Logout</button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="error"  v-if="isError || isSignUp">
      <modal name="modal"></modal>
    </div>
    <Nuxt/>
  </div>
</template>
<script>
import ModalMessage from '../components/ModalMessage';
export default {
  components: { ModalMessage },
  methods: {
    logout() {
      this.$store.commit('users/logout');
      this.deleteSession();
      this.$router.push('/login');
    },
    async deleteSession() {
      await this.$axios.get('/api/v1/users/logout');
    },
    showError() {
      this.$modal.show(
        ModalMessage,
        {
          message: this.errorMessage,
          title: 'エラーが発生しました。',
        },
        { 
          height: 100 },
        { 
          'before-close': () => {
            this.$store.commit('errors/releaseError');
          } 
        }
      );
    },
    showSignUp() {
      this.$modal.show(
        ModalMessage,
        {
          message: this.signUpMessage,
          title: '本登録を済ませてください。',
        },
        { 
          height: 100 },
        { 
          'before-close': () => {
            this.$store.commit('users/completeSignUp');
          } 
        }
      );
    },
  },
  computed: {
    userName() {
      return this.$store.state.users.userData.userName;
    },
    isLoginUser() {
      return this.$store.state.users.userData.isLogin;
    },
    isError() {
      if(this.$store.state.errors.errorData.isError) {
        this.showError();
      }
      return this.$store.state.errors.errorData.isError;
    },
    errorMessage() {
      return this.$store.state.errors.errorData.message;
    },
    isSignUp() {
      if(this.$store.state.users.userData.signUp.isSignUp) {
        this.showSignUp();
      }
      return this.$store.state.users.userData.signUp.isSignUp;
    },
    signUpMessage() {
      return this.$store.state.users.userData.signUp.message;
    }
  }
};
</script>
<style scoped>
#title {
  font-size: 1.5rem;
}
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
.logout {
  box-shadow: 0 5px 5px 0 rgb(97, 96, 96);
}
</style>
