import axios from 'axios';

const API_KEY = 'AIzaSyD1taGwtiy1bsQito0pmC2EMfVoWQkMMhg';

const authAxios = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1/'
});

let logoutTimer;

export default {
  async auth(context, payload) {
    const { email, password, mode } = payload;
    const params = {
      email,
      password,
      returnSecureToken: true
    };

    let url;
    if (mode === 'login') {
      url = `accounts:signInWithPassword`;
    } else if (mode === 'signUp') {
      url = `accounts:singUp`;
    } else {
      throw Error('mode is neither login nor signUp');
    }
    url += `?key=${API_KEY}`;

    const response = await authAxios.post(url, params);

    const responseData = response.data;
    const { idToken, localId, expiresIn } = responseData;

    const expiresInMills = +expiresIn * 1000;
    const tokenExpiration = new Date().getTime() + expiresInMills;

    logoutTimer = setTimeout(() => {
      context.dispatch('autoLogout');
    }, expiresInMills);

    localStorage.setItem('token', idToken);
    localStorage.setItem('userId', localId);
    localStorage.setItem('tokenExpiration', tokenExpiration);

    context.commit('setAuth', { userId: localId, token: idToken });
  },
  tryLogin(context) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const tokenExpiration = +localStorage.getItem('tokenExpiration');

    const expiresInMills = tokenExpiration - (new Date().getTime());

    if (!token || !userId || expiresInMills < 0) return;

    logoutTimer = setTimeout(() => {
      context.dispatch('autoLogout');
    }, expiresInMills);

    context.commit('setAuth', { userId, token });
  },
  async login(context, payload) {
    return context.dispatch('auth', {
      mode: 'login',
      ...payload
    });
  },
  async signUp(context, payload) {
    return context.dispatch('auth', {
      mode: 'signUp',
      ...payload
    });
  },
  logout(context) {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('tokenExpiration');

    clearTimeout(logoutTimer);

    context.commit('setAuth', { userId: null, token: null });
  },
  autoLogout(context) {
    context.dispatch('logout');
    context.commit('setAutoLogout');
  }
};
