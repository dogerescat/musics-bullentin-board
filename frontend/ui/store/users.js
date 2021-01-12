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
  }
};

export const actions = {
  async signUp({ commit }, userData) {
    try {
      const res = await this.$axios.$post('users/', userData);
      if(res.result) {
        return res;
      }
      const data = JSON.parse(res);
      commit('login', data);
      return data;
    } catch(error) {
      return;
    };
  
  },
  async login({ commit }, userData) {
    const res = await this.$axios.$post('users/login', userData);
    const data = JSON.parse(res);
    commit('login', data);
    return data;
  }
};
