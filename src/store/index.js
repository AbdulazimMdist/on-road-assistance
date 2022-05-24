import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    isAdmin: false,
  },

  getters: {
    getUser(state) {
      return state.user;
    },

    isAdmin(state) {
      return state.isAdmin;
    },
  },

  mutations: {
    SET_USER(state, payload) {
      state.user = payload;
    },

    SET_IS_ADMIN(state, payload) {
      state.isAdmin = payload;
    },
  },

  actions: {
    setUser({ commit }, payload) {
      commit("SET_USER", payload);
    },

    setIsAdmin({ commit }, payload) {
      commit("SET_IS_ADMIN", payload);
    },
  },

  modules: {},
});
