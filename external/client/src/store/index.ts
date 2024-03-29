import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate"

export default createStore({
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    }),
  ],
  state: {
    user: { role: "" },
    token: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
    },
  },
  getters: {
    isLoggedIn(state) {
      return !!state.token;
    },
    isAdmin(state) {
      return !!state.token && state.user?.role === "Admin";
    },
    isClient(state) {
      return !!state.token && state.user?.role === "Client";
    },
    userRole(state) {
      return state.user?.role;
    },
  },
  actions: {},
  modules: {},
});
