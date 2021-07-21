import { createStore } from 'vuex';
import axios from 'axios';

import coachStore from './modules/coach/coachStore.js';
import requestStore from './modules/requests/requestStore.js';
import authStore from './modules/auth/authStore.js';

const store = createStore({
  modules: {
    coach: coachStore,
    request: requestStore,
    auth: authStore
  },
  getters: {
    getAxios() {
      return axios.create({
        baseURL: 'https://vue-htt-demo-51252-default-rtdb.firebaseio.com'
      });
    }
  }
});

export default store;
