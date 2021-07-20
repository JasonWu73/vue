import mutations from './requestMutations.js';
import actions from './requestActions.js';
import getters from './requestGetters.js';

export default {
  namespaced: true,
  state() {
    return {
      requests: []
    };
  },
  mutations,
  actions,
  getters
};
