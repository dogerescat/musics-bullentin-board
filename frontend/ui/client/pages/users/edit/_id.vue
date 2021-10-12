<template>
  <div class="container">
    <div class="edit-profile">
      <h2>プロフィール編集</h2>
      <table>
        <tr>
          <th>
            <label for="">name</label>
          </th>
          <td>
            <input type="text" v-model="data.user.name" />
          </td>
        </tr>
        <tr>
          <th>
            <label for="">introduction</label>
          </th>
          <td>
            <textarea v-model="introduction" cols="60" rows="5"></textarea>
          </td>
        </tr>
        <tr>
          <th>
            <label for="">birthday</label>
          </th>
          <td>
            <select name="year" id="" v-model="year" >
              <option v-for="n in 50" :value="n + 1980" :key="n">
                {{ n + 1980 }}
              </option></select
            >年
            <select name="month" id="" v-model="month">
              <option v-for="n in 12" :value="n" :key="n">
                {{ n }}
              </option></select
            >月
            <select name="day" id="" v-model="day">
              <option v-for="n in 31" :value="n" :key="n">
                {{ n }}
              </option></select
            >日
          </td>
        </tr>
      </table>
      <div class="button">
        <button class="btn btn1" @click="edit">編集</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  validate({ store, redirect }) {
    if (!store.state.users.userData.isLogin) {
      redirect("/login");
      return false;
    }
    return true;
  },
  data() {
      return {
          year: '',
          month: '',
          day: '',
          introduction: ''
      }
  },
  mounted() {
    if(this.data.user.birthday) {
      const dateList = this.data.user.birthday.split('/');
      this.year = dateList[0];
      this.month = dateList[1];
      this.day = dateList[2];
    }
    if(this.data.user.message) {
      this.introduction = this.data.user.message;
    }
  },
  async asyncData({ $axios, store, params }) {
    const token = store.state.users.userData.token;
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    let data = await $axios.$get(`api/v1/users/${params.id}`, config);
    data = await JSON.parse(data);
    if (!data.result) {
      store.commit("errors/setError", data.error);
    }
    return { data };
  },
  methods: {
    async edit() {
      const token = this.$store.state.users.userData.token;
      const config = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      const editData = {
          name: this.data.user.name,
          message: this.introduction,
          birthday: `${this.year}/${this.month}/${this.day}`  
      }
      let data = await this.$axios.$put(
        `api/v1/users/${this.$route.params.id}/edit`,
        editData,
        config
      );
      data = await JSON.parse(data);
      if (!data.result) {
        this.$store.commit("errors/setError", data.error);
        return;
      }
      this.$router.push(`/users/${this.$route.params.id}`);
    },
  },
};
</script>

<style scoped>
.edit-profile {
  height: 650px;
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
h2 {
  text-align: center;
  margin-top: 20px;
  margin-bottom: 50px;
}
table {
  width: 80%;
  height: 500px;
  margin-left: 100px;
}
tr {
  height: 150px;
}
label {
  margin-right: 30px;
}
textarea {
  padding: 7px;
}
</style>
