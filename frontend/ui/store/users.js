export const state = () => ({
  userData: {
    userName: '',
    userId: 0,
    isLogin: false,
    token: '',
    signUp: {
      isSignUp: false,
      message: ''
    }
  }
});

export const mutations = {
  incompleteSignUp(state, message) {
    state.userData.signUp.isSignUp = true;
    state.userData.signUp.message = message;
  },
  completeSignUp(state) {
    state.userData.signUp.isSignUp = false;
    state.userData.signUp.message = '';
  },
  login(state, data) {
    state.userData.userName = data.name;
    state.userData.userId = data.user_id;
    state.userData.isLogin = true;
    state.userData.token = data.token;
  },
  logout(state) {
    state.userData.userName = '';
    state.userData.userId = '';
    state.userData.isLogin = false;
    state.userData.token = '';
  }
};

export const actions = {
  async signUp({ commit }, userData) {
    const res = await this.$axios.$post('/api/v1/users/', userData);
    const data = JSON.parse(res);
    if (!data.result) {
      commit('errors/setError', data.error, { root: true });
      return;
    }
    commit('incompleteSignUp', data.message);
    return data;
  },
  async login({ commit }, userData) {
    const res = await this.$axios.$post('/api/v1/users/login', userData);
    const data = JSON.parse(res);
    if (!data.result) {
      commit('errors/setError', data.error, { root: true });
      return data;
    }
    commit('login', data);
    return data;
  }
};
