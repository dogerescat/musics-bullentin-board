export const state = () => ({
  userData: {
    userName: '',
    userId: 0,
    isLogin: false,
    token: ''
  },
});

export const mutations = {
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
  },
};

export const actions = {
  async signUp({ commit }, userData) {
    try {
      const res = await this.$axios.$post('/api/users/', userData);
      const data = JSON.parse(res);
      if(data.error) {
        commit('errors/setError', data.error, {root: true});
      }
      return data;
    } catch(error) {
      return;
    };
  
  },
  async login({ commit }, userData) {
    const res = await this.$axios.$post('/api/users/login', userData);
    const data = JSON.parse(res);
    if(data.error) {
      commit('errors/setError',data.error, {root: true});
      return data;
    }
    commit('login', data);
    return data;
  },
};
