import mutations from './authMutations.js';
import actions from './authActions.js';
import getters from './authGetters.js';

export default {
  namespaced: false,
  state() {
    return {
      userId: null,
      token: null,
      didAutoLogout: false
    };
  },
  mutations,
  actions,
  getters
};
