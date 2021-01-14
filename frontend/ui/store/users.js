export const state = () => ({
  user_data: {
    user_name: '',
    user_id: 0,
    isLogin: false
  },
  error_data: {
    isError: false,
    message: ''
  }
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
  setError(state, msg) {
    state.error_data.isError = true;
    state.error_data.message = msg;
  },
  releaseError(state) {
    state.error_data.isError = false;
    state.error_data.message = '';
  }
};

export const actions = {
  async signUp({ commit }, userData) {
    try {
      const res = await this.$axios.$post('users/', userData);
      const data = JSON.parse(res);
      if(data.error) {
        commit('setError', data.error);
      }
      return data;
    } catch(error) {
      return;
    };
  
  },
  async login({ commit }, userData) {
    const res = await this.$axios.$post('users/login', userData);
    const data = JSON.parse(res);
    if(data.error) {
      commit('setError',data.error);
      return data;
    }
    commit('login', data);
    return data;
  }
};
