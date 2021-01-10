export const state = () => ({});

export const mutations = {};

export const actions = {
  async post({ commit }, postData) {
    const res = await this.$axios.$post('/posts/create', postData);
  }
};
