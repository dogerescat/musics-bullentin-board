export const state = () => ({
  errorData: {
    isError: false,
    message: ''
  }
});

export const mutations = {
  setError(state, msg) {
    state.errorData.isError = true;
    state.errorData.message = msg;
  },
  releaseError(state) {
    state.errorData.isError = false;
    state.errorData.message = '';
  }
};
