<template>
  <div class="container">
    <div class="login">
      <div class="title">
        <h1>ログイン</h1>
      </div>
      <div class="login-input">
        <div>
          <label for="">Email</label>
          <input type="email" v-model="email" />
        </div>
        <div>
          <label for="">Password</label>
          <input type="password" v-model="password" />
        </div>
        <button class="btn" @click="login" href="#">登録</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async login() {
      if (this.email === '' || this.password === '') {
        alert('全て入力してください');
        return;
      }
      try {
        const data = await this.$store.dispatch('users/login', {
          email: this.email,
          password: this.password,
        });
        if(data.error) {
          throw new Error(data.error);
        }
        this.saveToken(data);
      } catch(error) {
        return;
      } 
      this.$router.push('/posts');
    },
    saveToken(data) {
      const token = JSON.stringify(data.token);
      localStorage.setItem('token', token);
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
</style>