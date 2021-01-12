<template>
  <div class="container">
    <div class="register">
      <div class="title">
        <h1>新規登録</h1>
      </div>
      <div class="register-input">
        <div>
          <label for="">Name</label>
          <input type="text" v-model="name" />
        </div>
        <div>
          <label for="">Email</label>
          <input type="email" v-model="email" />
        </div>
        <div>
          <label for="">Password</label>
          <input type="password" v-model="password" />
        </div>
        <div>
          <label for="">Confirmation Password</label>
          <input type="password" v-model="confirmation" />
        </div>
        <button class="btn" @click="signUp" href="#">登録</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmation: '',
    };
  },
  methods: {
    async signUp() {
      if (this.name === '' || this.email === '' || this.password === '') {
        alert('全て入力してください');
        return;
      } else if (this.password !== this.confirmation) {
        alert('パスワードが一致しません');
        return;
      }
      try {
        const data = await this.$store.dispatch('users/signUp', {
          name: this.name,
          email: this.email,
          password: this.password,
        });
        this.saveToken(data);
      } catch (error) {
        return;
      } finally {
        this.name = '';
        this.email = '';
        this.password = '';
        this.confirmation = '';
        this.$router.push('/posts');

      }
    },
    saveToken(data) {
      const token = JSON.stringify(data.token);
      localStorage.setItem('token', token);
    }
  },
};
</script>

<style scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  text-align: center;
}
.register {
  margin: 0 auto;
}
.register-input {
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
