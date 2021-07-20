import { createStore } from 'vuex';

import getters from './rootGetters.js';
import coachStore from './modules/coach/coachStore.js';
import requestStore from './modules/requests/requestStore.js';

const store = createStore({
  modules: {
    coach: coachStore,
    request: requestStore
  },
  state() {
    return {
      userId: 'c3'
    };
  },
  getters
});

export default store;
