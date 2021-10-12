<template>
  <div class="container">
    <div class="title">
      <h2>
       プロフィール
      </h2>
    </div>
    <table>
      <tr class="name">
        <th>ユーザー名</th>
        <td>{{data.user.name}}</td>
      </tr>
      <tr class="introduction">
        <th>紹介</th>
        <td>{{introduction}}</td>  
      </tr>
      <tr class="birthday">
        <th>生年月日</th>
        <td>{{birthday}}</td>
      </tr>
    </table>
    <div class="button" v-if="isProfile">
     <button @click="goEditPage" class="btn1 btn">編集</button>
    </div>
  </div>
</template>

<script>
export default {
  validate({ store, redirect }) {
    if (!store.state.users.userData.isLogin) {
      redirect('/login');
      return false;
    }
    return true;
  },
  async asyncData({$axios, store, params}) {
    const token = store.state.users.userData.token;
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    let data = await $axios.$get(`api/v1/users/${params.id}`, config);
    data = await JSON.parse(data);
    if (!data.result) {
      store.commit('errors/setError', data.error);
    }
    return { data };
  },
  methods: {
    goEditPage() {
      this.$router.push(`/users/edit/${this.$route.params.id}`);
    }
  },
  computed: {
    introduction() {
      if(!this.data.user.message) {
        return '未登録'
      }
      return this.data.user.message;
    },
    birthday() {
      if(!this.data.user.birthday) {
        return '未登録'
      }
      return this.data.user.birthday;
    },
    isProfile() {
      if(this.data.user.user_id === this.$store.state.users.userData.userId) {
        return true;
      }
      return false;
    }
  }
};
</script>

<style scoped>
.container {
  height: 100vh;
}
.title {
  margin-top: 30px;
  margin-bottom: 20px;
  text-align: center;
}
.btn1 {
  display: inline;
  height: 40px;
  width: 100px;
  line-height: 20px;
  background: #aaefe7;
  color: #474747;
  box-shadow: 0 5px 5px 0 rgb(97, 96, 96);
  border-radius: 25px;
  text-decoration: none;
  text-align: center;
  margin-right: 20px;
}
table {
  width: 70%;
  height: 400px;
  margin: 0px auto;
  margin-bottom: 50px;
}
.button {
  text-align: center;
}
.name {
  height: 50px;
}
.birthday {
  height: 50px;
}
</style>