<template>
  <div class="container">
    <div class="login">
      <div class="title">
        <h1>ログイン</h1>
      </div>
      <div class="login-input">
        <div class="login-email">
          <label for="">Email</label>
          <input type="email" v-model="email" />
        </div>
        <div class="login-password">
          <label for="">Password</label>
          <input type="password" v-model="password" />
        </div>
        <button class="btn login-btn" @click="login" href="#">ログイン</button>
      </div>
    </div>
    <div class="oauth">
      <div class="btn google-auth-btn" @click="loginGoogle">
        <font-awesome-icon
          :icon="['fab', 'google']"
          style="color: #fff; font-size: 23px; margin-top: 5px"
        />
        <a>Sign In with Google</a>
      </div>
      <div class="btn facebook-auth-btn" @click="loginFacebook">
        <font-awesome-icon
          :icon="['fab', 'facebook-square']"
          style="color: #fff; font-size: 23px; margin-top: 5px"
        />
        <a>Sign In with Facebook</a>
      </div>
      <div class="btn github-auth-btn" @click="loginGithub">
        <font-awesome-icon
          :icon="['fab', 'github']"
          style="
            color: #fff;
            font-size: 23px;
            margin-top: 5px;
            margin-right: 5px;
          "
        />
        <a>Sign In with Github</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  validate({ store, redirect }) {
    if (store.state.users.userData.isLogin) {
      redirect('/posts');
      return false;
    }
    return true;
  },
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async login() {
      if (this.email === '' || this.password === '') {
        return;
      }
      const data = await this.$store.dispatch('users/login', {
        email: this.email,
        password: this.password,
      });
      if (!data.result) {
        return;
      }
      this.$router.push('/posts');
    },
    setToken(sns) {
      setTimeout(async () => {
        const res = await this.$axios.$get(`/api/v1/oauth/${sns}/login`);
        const data = await JSON.parse(res);
        if(!data.result) {
          return;
        }
        location.href = 'https://musics-board.herokuapp.com/posts'
      }, 10000);
    },
    loginGoogle() {
      open('/api/v1/oauth/google');
      this.setToken('google');
    },
    loginFacebook() {
      open('/api/v1/oauth/facebook');
      this.setToken('facebook');
    },
    loginGithub() {
      open('/api/v1/oauth/github');
      this.setToken('github');
    },
  },
};
</script>

<style scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  text-align: center;
}
.login {
  margin: 0 auto;
}
.login-input {
  text-align: right;
  margin: 0 auto;
  margin-right: 30%;
}
.title {
  width: 50%;
  height: 100px;
  margin: 0 auto;
  margin-top: 30px;
  margin-bottom: 50px;
  color: #474747;
}
.login-btn {
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
  margin-top: 60px;
  margin-right: 20%;
}
.login-email {
  margin-right: 70px;
}
.login-password {
  margin-right: 70px;
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
.oauth {
  width: 60%;
  height: 300px;
  margin: 0 auto;
  margin-top: 80px;
}
.google-auth-btn {
  display: block;
  text-align: right;
  width: 280px;
  height: 50px;
  margin: 10px auto;
  background-color: #ce5c65;
  box-shadow: 0 10px 15px 0 rgb(207, 121, 121);
  font-size: 20px;
}
.facebook-auth-btn {
  display: block;
  text-align: right;
  width: 280px;
  height: 50px;
  margin: 10px auto;
  margin-top: 25px;
  background-color: #2297f7;
  box-shadow: 0 10px 15px 0 rgb(116, 158, 214);
  font-size: 20px;
}
.github-auth-btn {
  display: block;
  text-align: right;
  width: 280px;
  height: 50px;
  margin: 10px auto;
  margin-top: 25px;
  background-color: #424649;
  box-shadow: 0 10px 15px 0 rgb(97, 96, 96);
  font-size: 20px;
}
a {
  margin-left: 15px;
  color: #fff;
}
</style>