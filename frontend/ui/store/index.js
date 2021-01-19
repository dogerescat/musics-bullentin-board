export const actions = {
  async nuxtServerInit({ commit }) {
    const res = await this.$axios.$get('/api/users/login/jwt');
    const data = JSON.parse(res);
    if(data.result) {
      commit('users/login', data.userData, {root: true});
    }
  }
};
