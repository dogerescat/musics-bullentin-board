export const state = () => ({
  error_data: {
    isError: false,
    message: ""
  }
});

export const mutations = {
  setError(state, msg) {
    state.error_data.isError = true;
    state.error_data.message = msg;
  },
  releaseError(state) {
    state.error_data.isError = false;
    state.error_data.message = '';
  }
};
