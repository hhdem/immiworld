// import user from './user';
import VuexPersistence from "vuex-persist";
import authApi from "../api/auth";

export const state = () => ({
  currentUser: {
    id: -1,
    name: "",
    email: "",
    image: "",
    isAdmin: false,
  },
  isAuthenticated: false,
  token: "",
  locales: ['en', 'zh'],
  locale: 'zh',
});

export const mutations = {
  refreshToken() {
    console.info("store index refreshToken()");
    authApi.checkToken();
  },
  setCurrentUser(state, currentUser) {
    console.info("store index setCurrentUser()");
    state.currentUser = {
      ...state.currentUser,
      // 將 API 取得的 currentUser 覆蓋掉 Vuex state 中的 currentUser
      ...currentUser,
    };
    state.isAuthenticated = true;
    state.token = localStorage.getItem("token");
  },
  revokeAuthentication(state) {
    state.currentUser = {};
    state.isAuthenticated = false;
    state.token = "";
    localStorage.clear();
  },
  SET_LANG(state, locale) {
    console.info('SetLang called', state.locale, locale);
    if (state.locales.indexOf(locale) !== -1) {
        state.locale = locale
    }
  },
};

export const actions = {};

export const plugins = process.browser ? [new VuexPersistence().plugin] : [];

// export const modules = {
//   user
// }
