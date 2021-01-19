export const state = () => ({
  user_data: {
    user_name: '',
    user_id: 0,
    isLogin: false
  },
});

export const mutations = {
  login(state, data) {
    state.user_data.user_name = data.name;
    state.user_data.user_id = data.user_id; 
    state.user_data.isLogin = true; 
  },
  logout(state) {
    state.user_data.user_name = '';
    state.user_data.user_id = ''; 
    state.user_data.isLogin = false;
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
  async loginJwt({commit}, token) {
    const config = {
      headers: {
        authorization: `Bearer ${token}`
      }
    }
    const res = await this.$axios.$get('/api/users/login/jwt', config);
    const data = JSON.parse(res);
    commit('login', data);
    return;
  }
};
