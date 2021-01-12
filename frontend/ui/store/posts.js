export const state = () => ({
});

export const mutations = {};

const getData = () => {
  let token = localStorage.getItem('token');
  token = JSON.parse(token);
  const config = {
    headers: {
      authorization: `Bearer ${token}`
    }
  }
  return config;
}
export const actions = {
  async post({ commit }, postData) {
    const config = getData();
    
    const res = await this.$axios.$post('/posts/create', postData, config);
  },
};
